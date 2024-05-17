/**
 * @module queries/abstractions/ReadOneQuery
 * @description A module that provides a query for reading a single entity
 * @requires module:sequelize
 * @requires module:queries/abstractions/ModelQuery
 * @requires module:controllers/api/errors/APIActorError
 */
import ModelQuery from "./ModelQuery.js";
import APIActorError from "../../controllers/api/errors/APIActorError.js";
import { Op, QueryTypes } from "sequelize";

/**
 * @class ReadOneQuery
 * @classdesc A query for reading a single entity
 * @extends ModelQuery
 */
export default class ReadOneQuery extends ModelQuery {
    constructor(
        modelDefinition,
        pk, 
        additionalParams = {},
    ) {
        super();

        if (!modelDefinition || typeof modelDefinition !== "object") {
            throw new Error("modelDefinition is required and must be an object");
        }

        if (!pk || typeof pk !== "string") {
            throw new Error("pk is required and must be a string");
        }

        if (additionalParams && typeof additionalParams !== "object") {
            throw new Error("additionalParams must be an object");
        }

        this.pk = pk;
        this.modelDefinition = modelDefinition;
        this.additionalParams = additionalParams;
    }

    /**
     * @function execute
     * @description Executes the query
     * @param {object} db - The database connection
     * @returns {Promise<object>} - The result of the query
     * @throws {Error} db is required and must be an object
     * @throws {APIActorError} No Entity found
     * @async
     * @override
     */
    async execute(db) {
        if (!db || typeof db !== "object") {
            throw new Error("db is required and must be an object");
        }

        const modelDefinition = this.modelDefinition;
        const { dto, tableName, snapshot, tombstone, pkName } = modelDefinition;

        const queryOptions = {
            mTable: tableName,
            sTable: snapshot ? snapshot.tableName : null, 
            tTable: tombstone ? tombstone.tableName : null, 
            fkName: snapshot?.fkName || tombstone?.fkName || null, 
            limit: 1,
            pkName, 
            where:[{ 
                table: tableName, 
                column: pkName, 
                operator: Op.eq, 
                key: 'pk'
            }],
        }

        if (this.additionalParams.where) {
            this.additionalParams.where.forEach(w => {
                replacements[w.table] = w.table;
                replacements[w.column] = w.column;
                replacements[w.key] = w.value;
                queryOptions.where.push(w);
            });
        }

        const replacements = { pk: this.pk, limit: 1 };
        const selectSQL = ModelQuery.getSql({ prefix: "SELECT *", ...queryOptions });
        const selectOpt = { type: QueryTypes.SELECT, replacements }

        const entity = await db.sequelize.query(selectSQL, selectOpt);

        if (entity.length === 0) {
            throw new APIActorError("No Entity found", 404);
        }

        return dto(entity[0]);
    }
}
