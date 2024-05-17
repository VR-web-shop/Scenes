import _ReadOneQuery from "../abstractions/ReadOneQuery.js";
import ModelDefinition from "../../modelDefinitions/SceneCamera.js";

export default class ReadOneQuery extends _ReadOneQuery {

    constructor(client_side_uuid, additionalParams = {}) {
        super(
            ModelDefinition,
            client_side_uuid, 
            additionalParams,
        );
    }
}
