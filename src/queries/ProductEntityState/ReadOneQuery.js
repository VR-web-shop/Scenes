import _ReadOneQuery from "../abstractions/ReadOneQuery.js";
import ModelDefinition from "../../modelDefinitions/ProductEntityState.js";

export default class ReadOneQuery extends _ReadOneQuery {

    constructor(name, additionalParams = {}) {
        super(
            ModelDefinition,
            name, 
            additionalParams,
        );
    }
}
