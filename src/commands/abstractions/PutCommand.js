/**
 * @module commands/abstractions/PutCommand
 * @description A module that provides a command for putting a model instance
 * @requires module:commands/abstractions/ModelCommand
 * @requires module:controllers/api/errors/APIActorError
 */
import ModelCommand from "../abstractions/ModelCommand.js";
import APIActorError from "../../controllers/api/errors/APIActorError.js";
import ElasticService from "../../services/ElasticService.js";

/**
 * @class PutCommand
 * @classdesc A command for putting a model instance
 * @extends commands/abstractions/ModelCommand
 */
export default class PutCommand extends ModelCommand {

    /**
     * @constructor
     */
    constructor(modelDefinition, pk, params) {
        super();

        if (!modelDefinition || typeof modelDefinition !== "object") {
            throw new Error("modelDefinition is required and must be an object");
        }

        if (!pk || typeof pk !== "string") {
            throw new Error("pk is required and must be a string");
        }

        if (!params || typeof params !== "object") {
            throw new Error("Params is required and must be an object");
        }

        this.modelDefinition = modelDefinition;
        this.pk = pk;
        this.params = params;
    }

    /**
     * @function execute
     * @description Puts a model instance
     * @param {object} db - The database connection
     * @param {object} [options={}] - The options for the command
     * @param {object} [options.beforeTransactions] - The transactions to run before the main transaction
     * @param {object} [options.afterTransactions] - The transactions to run after the main transaction
     * @returns {Promise<void>} - The result of the command
     * @throws {Error} If db is not provided or not an object
     * @throws {APIActorError} If an error occurs while putting the entity
     * @async
     * @override
     */
    async execute(db, options={}) {
        if (!db || typeof db !== "object") {
            throw new Error("db is required and must be an object");
        }

        if (!options || typeof options !== "object") {
            throw new Error("options is required and must be an object");
        }

        const { modelName, pkName, casKeys, snapshot, tombstone, indexName } = this.modelDefinition;

        const pk = this.pk;
        const params = this.params;
        const fkName = snapshot?.fkName || tombstone?.fkName || null;
        const snapshotName = snapshot?.modelName || null;
        const tombstoneName = tombstone?.modelName || null;
        const time = {
            created_at: new Date(),
            updated_at: new Date(),
        }

        try {
            const executeTransaction = async (transaction) => {
                let entity = await db[modelName].findOne(
                    { 
                        where: { [pkName]: pk },
                        include: [
                            { 
                                model: db[tombstoneName], 
                                limit: 1,
                                order: [["created_at", "DESC"]] 
                            },
                            { 
                                model: db[snapshotName], 
                                limit: 1,
                                order: [["created_at", "DESC"]] 
                            }
                        ]
                    },
                    { transaction }
                );

                if (!entity) {
                    entity = await db[modelName].create(
                        { [pkName]: pk }, 
                        { transaction }
                    );
                } else if (tombstoneName && entity[`${tombstoneName}s`].length > 0) {
                    // Undo remove
                    await db[tombstoneName].destroy(
                        { where: { [fkName]: pk } },
                        { transaction }
                    );
                }

                if (snapshotName) {
                    const snapshots = entity[`${snapshotName}s`];
                    if (snapshots && snapshots.length > 0) {
                        const description = snapshots[0];
                        const inputString = casKeys.map(key => params[key]).join(", ");
                        const currentString = casKeys.map(key => description[key]).join(", ");
                        const inputCAS = PutCommand.calculateCAS(inputString);
                        const currentCAS = PutCommand.calculateCAS(currentString);
                        if (currentCAS === inputCAS) return; // No changes
                    }
                }

                if (options.beforeTransactions) {
                    for (const beforeTransaction of options.beforeTransactions) {
                        await beforeTransaction(transaction, entity, params);
                    }
                }

                let snapshot = null;
                if (snapshotName) {
                    snapshot = await db[snapshotName].create(
                        { [fkName]: pk, ...params, ...time }, 
                        { transaction }
                    );
                } else {
                    await entity.update(params, { transaction });
                }

                if (options.afterTransactions) {
                    for (const afterTransaction of options.afterTransactions) {
                        await afterTransaction(transaction, entity, snapshot);
                    }
                }
            };

            if (options.transaction) {
                await executeTransaction(options.transaction);
            } else {
                await db.sequelize.transaction(executeTransaction);
            }

            await ElasticService.put(indexName, pk, params);
        } catch (error) {
            console.log(error)

            if (error instanceof APIActorError) {
                throw error;
            }

            if (error.name === "SequelizeUniqueConstraintError") {
                const paths = error.errors.map(e => e.path).join(", ");
                throw new APIActorError(`The following fields must be unique: ${paths}`, 400);
            }

            throw new APIActorError("An error occurred while putting an entity", 500);
        }
    }

    /**
     * @function calculateCAS
     * @description Calculates the CAS value
     * @param {object} params - The parameters to calculate the CAS value
     * @returns {string} - The CAS value
     * @static
     */
    static calculateCAS = (params) => {
        const base64 = Buffer.from(`${params}`).toString("base64");
        return Buffer.from(base64).toString("base64");
    }
}
