import _ReadCollectionElasticQuery from "../abstractions/ReadCollectionElasticQuery.js";
import ModelDefinition from "../../modelDefinitions/DistributedTransaction.js";

export default class ReadCollectionElasticQuery extends _ReadCollectionElasticQuery {

    constructor(options = {}) {
        super(
            ModelDefinition,
            options,
        );
    }
}
