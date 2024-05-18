import _SearchElasticQuery from "./SearchElasticQuery.js";
import APIActorError from "../../controllers/api/errors/APIActorError.js";

export default class ReadOneElasticQuery extends _SearchElasticQuery {

    constructor(ModelDefinition, pk, options = {}) {
        super(
            {
                index: ModelDefinition.indexName,
                query: {
                    match: {
                        [ModelDefinition.pkName]: pk,
                    }
                },
            },
            options,
        );

        this.ModelDefinition = ModelDefinition;
    }

    async execute(searchMethod) {
        const result = await super.execute(searchMethod);

        if (result.hits.total.value === 0) {
            throw new APIActorError("Not Found", 404);
        }

        return this.ModelDefinition.dto(result.hits.hits[0]._source);
    }
}
