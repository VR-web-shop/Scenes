import _ReadCollectionElasticQuery from "../abstractions/ReadCollectionElasticQuery.js";
import ModelDefinition from "../../modelDefinitions/SceneLightType.js";

export default class ReadCollectionElasticQuery extends _ReadCollectionElasticQuery {

    constructor(options = {}) {
        super(
            ModelDefinition,
            options,
        );
    }
}
