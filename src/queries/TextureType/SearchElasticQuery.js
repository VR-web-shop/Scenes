import _SearchElasticQuery from "../abstractions/SearchElasticQuery.js";
import ModelDefinition from "../../modelDefinitions/TextureType.js";

export default class SearchElasticQuery extends _SearchElasticQuery {

    constructor(query, options = {}) {
        super(
            ModelDefinition,
            query, 
            options,
        );
    }
}
