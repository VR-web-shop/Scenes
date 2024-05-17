import _CreateCommand from "../abstractions/CreateCommand.js";
import ModelDefinition from "../../modelDefinitions/MaterialTexture.js";

export default class CreateCommand extends _CreateCommand {
    constructor(client_side_uuid, params) {
        super(
            ModelDefinition,
            client_side_uuid, 
            params, 
        );
    }
}
