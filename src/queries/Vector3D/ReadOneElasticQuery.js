import _ReadOneElasticQuery from "../abstractions/ReadOneElasticQuery.js";
import ModelDefinition from "../../modelDefinitions/Vector3D.js";

export default class ReadOneElasticQuery extends _ReadOneElasticQuery {

    constructor(pk, options = {}) {
        super(
            ModelDefinition,
            pk, 
            options,
        );
    }
}
