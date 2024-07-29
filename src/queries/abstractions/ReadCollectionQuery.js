/**
 * @module queries/abstractions/ReadCollectionQuery
 * @description An abstraction for reading a collection of entities
 * @requires module:sequelize
 * @requires module:queries/abstractions/ModelQuery
 */
import ModelQuery from "./ModelQuery.js";
import { QueryTypes } from "sequelize";

/**
 * @class ReadCollectionQuery
 * @classdesc An abstraction for reading a collection of entities
 * @extends queries/abstractions/ModelQuery
 */
export default class ReadCollectionQuery extends ModelQuery {

    /**
     * @constructor
     */
    constructor(
        modelDefinition,
        options = {},
    ) {
        super();

        if (!modelDefinition || typeof modelDefinition !== "object") {
            throw new Error("modelDefinition is required and must be an object");
        }
        
        if (typeof options !== "object") {
            throw new Error("Options must be an object");
        }

        this.modelDefinition = modelDefinition;
        this.options = options;
    }

    /**
     * @function execute
     * @description Executes the query
     * @param {object} db - The database connection
     * @returns {Promise<object>} The result of the query
     * @throws {Error} db is required and must be an object
     * @throws {APIActorError} limit must be greater than 0
     * @throws {APIActorError} page must be greater than 0
     * @throws {APIActorError} limit is required when using page
     * @async
     * @override
     */
    async execute(db) {
        if (!db || typeof db !== "object") {
            throw new Error("db is required and must be an object");
        }
        
        const options = this.options;

        let limit, page, offset;

        if (options.limit) {
            limit = parseInt(options.limit);

            if (limit < 1) {
                throw new APIActorError("limit must be greater than 0", 400);
            }
        }

        if (options.page) {
            page = parseInt(options.page);
            
            if (page < 1) {
                throw new APIActorError("page must be greater than 0", 400);
            }

            if (!limit) {
                throw new APIActorError("limit is required when using page", 400);
            }

            offset = (page - 1) * limit;
        }

        const modelDefinition = this.modelDefinition;
        const { dto, tableName, snapshot, tombstone, pkName } = modelDefinition;
        const mTable = tableName;
        const sTable = snapshot ? snapshot.tableName : null;
        const tTable = tombstone ? tombstone.tableName : null;
        const fkName = snapshot?.fkName || tombstone?.fkName || null; 
        const where = options.where;

        const queryOptions = {
            limit, 
            offset, 
            mTable, 
            sTable, 
            tTable, 
            where, 
            fkName, 
            pkName, 
        }

        const countOptions = {
            mTable, 
            sTable, 
            tTable, 
            where, 
            fkName, 
            pkName, 
        }

        const replacements = {
            limit, 
            offset, 
        };

        if (options.where) {
            // Add replacements for where clause
            // Example:
            // replacements[table] = table;
            // replacements[column] = column;
            // replacements[key] = value;
            options.where.forEach(w => {
                replacements[w.table] = w.table;
                replacements[w.column] = w.column;
                replacements[w.key] = w.value;
            });
        }

        const selectSQL = ModelQuery.getSql({ prefix: "SELECT *", ...queryOptions });
        const countSQL = ModelQuery.getSql({ prefix: "SELECT COUNT(*)", ...countOptions });
        const queryOpt = { type: QueryTypes.SELECT, replacements };

        const entities = await db.sequelize.query(selectSQL, queryOpt);
        const countRes = await db.sequelize.query(countSQL, queryOpt);

        const count = countRes[0]["COUNT(*)"];
        const rows = entities.map(entity => dto(entity));
        const result = { rows, count };

        if (page) {
            const pages = Math.ceil(count / limit);
            result.pages = pages;
        }

        return result;
    }
}
