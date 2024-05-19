/**
 * @module queries/abstractions/SearchElasticQuery
 * @description An abstraction for searching entities in ElasticSearch
 * @requires module:queries/abstractions/ModelQuery
 * @requires module:services/ElasticService
 */
import ModelQuery from "./ModelQuery.js";

/**
 * @class SearchElasticQuery
 * @classdesc An abstraction for searching entities in ElasticSearch
 * @extends queries/abstractions/ModelQuery
 */
export default class SearchElasticQuery extends ModelQuery {

    /**
     * @constructor
     */
    constructor(
        query,
        configIndex,
        options = {},
    ) {
        super();
        
        if (typeof options !== "object") {
            throw new Error("Options must be an object");
        }

        this.query = query;
        this.options = options;
    }

    /**
     * @function execute
     * @description Executes the query
     * @param {Function} searchMethod - The search method
     * @returns {Promise<object>} - The result of the query
     * @throws {Error} db is required and must be an object
     * @throws {APIActorError} No Entity found
     * @async
     * @override
     */
    async execute(searchMethod) {
        if (!searchMethod || typeof searchMethod !== "function") {
            throw new Error("searchMethod is required and must be a function");
        }
        
        const result = await searchMethod(this.query);

        return result;
    }
}
