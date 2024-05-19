import _SearchElasticQuery from "./SearchElasticQuery.js";
import APIActorError from "../../controllers/api/errors/APIActorError.js";

const prepare = (ModelDefinition, pk) => {
    const index = ModelDefinition.elastic[0].indexName;
    return {
        index,
        query: {
            match: {
                [ModelDefinition.pkName]: pk,
            }
        },
    };
};

export default class ReadOneElasticQuery extends _SearchElasticQuery {

    constructor(ModelDefinition, pk, options = {}) {
        super(
            ModelDefinition,
            prepare(ModelDefinition, pk),
            options,
        );

        this.ModelDefinition = ModelDefinition;
    }

    async execute(searchMethod) {
        const { rows, count } = await super.execute(searchMethod);

        if (count === 0) {
            throw new APIActorError("Not Found", 404);
        }

        return this.ModelDefinition.dto(rows[0]);
    }
}
