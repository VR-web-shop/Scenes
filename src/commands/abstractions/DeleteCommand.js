/**
 * @module commands/abstractions/DeleteCommand
 * @description A module that provides a command for deleting a model instance
 * @requires module:commands/abstractions/ModelCommand
 * @requires module:controllers/api/errors/APIActorError
 */
import ModelCommand from "../abstractions/ModelCommand.js";
import APIActorError from "../../controllers/api/errors/APIActorError.js";
import ElasticService from "../../services/ElasticService.js";

/**
 * @class DeleteCommand
 * @classdesc A command for deleting a model instance
 * @extends commands/abstractions/ModelCommand
 */
export default class DeleteCommand extends ModelCommand {

    /**
     * @constructor
     */
    constructor(modelDefinition, pk) {
        super();

        if (!modelDefinition || typeof modelDefinition !== "object") {
            throw new Error("modelDefinition is required and must be an object");
        }

        if (!pk || typeof pk !== "string") {
            throw new Error("pk is required and must be a string");
        }

        this.modelDefinition = modelDefinition
        this.pk = pk;
    }

    /**
     * @function execute
     * @description Deletes a model instance
     * @param {object} db - The database connection
     * @param {object} [options={}] - The options for the command
     * @param {Function} [options.transaction] - The transaction to run the command in
     * @param {Array<Function>} [options.beforeTransactions] - The transactions to run before the main transaction
     * @param {Array<Function>} [options.afterTransactions] - The transactions to run after the main transaction
     * @returns {Promise<void>} - A promise that resolves when the command is complete
     * @throws {Error} If db is not provided or not an object
     * @throws {APIActorError} If no entity is found
     * @throws {APIActorError} If an error occurs while deleting the entity
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
        const fkName = snapshot?.fkName || tombstone?.fkName || null;
        const tombstoneName = tombstone?.modelName || null;
        const time = {
            deleted_at: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
        }

        try {
            const executeTransaction = async (transaction) => {
                const entity = await db[modelName].findOne(
                    { 
                        where: { [pkName]: pk },
                        include: [{ model: db[tombstoneName], limit: 1 }]
                    },
                    { transaction }
                );
    
                if (!entity || tombstoneName && entity[`${tombstoneName}s`].length > 0) {
                    throw new APIActorError("No entity found", 404);
                }

                if (options.beforeTransactions) {
                    for (const beforeTransaction of options.beforeTransactions) {
                        await beforeTransaction(transaction, entity);
                    }
                }

                if (tombstoneName) {
                    await db[tombstoneName].create(
                        { [fkName]: pk, ...time },
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
                await db.sequelize.transaction(executeTransaction);
            }

            await ElasticService.remove(indexName, pk);
        } catch (error) {
            console.log(error)
            
            if (error instanceof APIActorError) {
                throw error;
            }

            throw new APIActorError("An error occurred while deleting the entity", 500);
        }
    }
}
