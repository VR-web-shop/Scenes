import _ReadOneQuery from "../abstractions/ReadOneQuery.js";
import ModelDefinition from "../../modelDefinitions/ProcessedMessage.js";

export default class ReadOneQuery extends _ReadOneQuery {

    constructor(subscriber_uuid, additionalParams = {}) {
        super(
            ModelDefinition,
            subscriber_uuid, 
            additionalParams,
        );
    }
}
