import _SearchElasticQuery from "./SearchElasticQuery.js";
import APIActorError from "../../controllers/api/errors/APIActorError.js";
const query = (ModelDefinition, options) => {
    let { page, limit } = options;
    const index = ModelDefinition.elastic[0].indexName

    if (page) {
        page = parseInt(page);
        if (page < 1) {
            throw new APIActorError("page must be a positive integer", 400);
        }
    } else {
        page = 1;
    }

    if (limit) {
        limit = parseInt(limit);
        if (limit < 1) {
            throw new APIActorError("limit must be a positive integer", 400);
        }
    } else {
        limit = 10;
    }
    
    const q = {
        index: [index],
        from: (page - 1) * limit,
        size: limit,
    };

    return q;
};

export default class ReadCollectionElasticQuery extends _SearchElasticQuery {

    constructor(ModelDefinition, options = {}) {
        super(
            ModelDefinition,
            query(ModelDefinition, options),
            options,
        );
        this.ModelDefinition = ModelDefinition;
    }

    async execute(searchMethod) {
        const result = await super.execute(searchMethod);
        const rows = result.rows;
        const count = result.count;
        const pages = Math.ceil(count / this.options.limit);

        return {
            rows,
            pages,
            count,
        };
    }
}
