/**
 * @module commands/abstractions/CreateCommand
 * @description A module that provides a command for creating a model instance
 * @requires module:commands/abstractions/ModelCommand
 * @requires module:controllers/api/errors/APIActorError
 */
import ModelCommand from "../abstractions/ModelCommand.js";
import APIActorError from "../../controllers/api/errors/APIActorError.js";
import ElasticService from "../../services/ElasticService.js";

/**
 * @class CreateCommand
 * @classdesc A command for creating a model instance
 * @extends commands/abstractions/ModelCommand
 */
export default class CreateCommand extends ModelCommand {

    /**
     * @constructor
     */
    constructor(modelDefinition, pk, params, snapshotParams={}) {
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

        if (!snapshotParams && typeof snapshotParams !== "object") {
            throw new Error("SnapshotParams must be an object");
        }

        this.modelDefinition = modelDefinition;
        this.pk = pk;
        this.params = params;
        this.snapshotParams = snapshotParams;
    }

    /**
     * @function execute
     * @description Creates a model instance
     * @param {object} db - The database connection
     * @param {object} [options={}] - The options for the command
     * @param {Function} [options.transaction] - The transaction to run the command in
     * @param {Array<Function>} [options.beforeTransactions] - The transactions to run before the main transaction
     * @param {Array<Function>} [options.afterTransactions] - The transactions to run after the main transaction
     * @throws {Error} If db is not provided or not an object
     * @throws {APIActorError} If the entity already exists
     * @throws {APIActorError} If an error occurs while creating the entity
     * @returns {Promise<void>} The result of the command
     * @async
     * @override
     */
    async execute(db, options={}) {
        if (!db || typeof db !== "object") {
            throw new Error("db is required and must be an object");
        }

        const { modelName, pkName, snapshot, tombstone, indexName } = this.modelDefinition;

        const pk = this.pk;
        const params = this.params;
        const fkName = snapshot?.fkName || tombstone?.fkName || null;
        const snapshotName = this.snapshotName;
        const snapshotParams = this.snapshotParams;
        const time = {
            created_at: new Date(),
            updated_at: new Date(),
        }

        try {
            const executeTransaction = async (transaction) => {
                const entity = await db[modelName].findOne(
                    { where: { [pkName]: pk } },
                    { transaction }
                );

                if (entity) {
                    throw new APIActorError(`Entity with ${pkName} ${pk} already exists`, 400);
                }

                if (options.beforeTransactions) {
                    for (const beforeTransaction of options.beforeTransactions) {
                        await beforeTransaction(transaction, entity);
                    }
                }

                await db[modelName].create(
                    { [pkName]: pk, ...params, ...time }, 
                    { transaction }
                );

                if (snapshotName && snapshotParams) {
                    await db[snapshotName].create(
                        { [fkName]: pk, ...snapshotParams, ...time }, 
                        { transaction }
                    );
                }

                if (options.afterTransactions) {
                    for (const afterTransaction of options.afterTransactions) {
                        await afterTransaction(transaction, entity);
                    }
                }
            };

            if (options.transaction) {
                await executeTransaction(options.transaction);
            } else {
                await db.transaction(executeTransaction);
            }

            ElasticService.put(indexName, pk, {...params, [pkName]: pk});
        } catch (error) {
            console.log(error)
            
            if (error instanceof APIActorError) {
                throw error;
            }

            if (error.name === "SequelizeUniqueConstraintError") {
                const paths = error.errors.map(e => e.path).join(", ");
                throw new APIActorError(`The following fields must be unique: ${paths}`, 400);
            }

            throw new APIActorError("An error occurred while creating the entity", 500);
        }
    }
}
