import _SearchElasticQuery from "./SearchElasticQuery.js";

const query = (ModelDefinition, options) => {
    let { page, limit } = options;

    if (page) {
        page = parseInt(page);
        if (page < 1) {
            throw new Error("page must be a positive integer");
        }
    } else {
        page = 1;
    }

    if (limit) {
        limit = parseInt(limit);
        if (limit < 1) {
            throw new Error("limit must be a positive integer");
        }
    } else {
        limit = 10;
    }
    
    return {
        index: ModelDefinition.indexName,
        from: (page - 1) * limit,
        size: limit,
    };
};

export default class ReadCollectionElasticQuery extends _SearchElasticQuery {

    constructor(ModelDefinition, options = {}) {
        super(
            query(ModelDefinition, options),
            options,
        );
        this.ModelDefinition = ModelDefinition;
    }

    async execute(searchMethod) {
        const result = await super.execute(searchMethod);
        const rows = result.hits.hits.map(hit => this.ModelDefinition.dto(hit._source));
        const pages = Math.ceil(result.hits.total.value / this.options.limit);
        const count = result.hits.total.value;

        return {
            rows,
            pages,
            count,
        };
    }
}
