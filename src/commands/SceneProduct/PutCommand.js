import _PutCommand from "../abstractions/PutCommand.js";
import ModelDefinition from "../../modelDefinitions/SceneProduct.js";

export default class PutCommand extends _PutCommand {
    constructor(client_side_uuid, params) {
        super(
            ModelDefinition,
            client_side_uuid, 
            params, 
        );
    }
}
