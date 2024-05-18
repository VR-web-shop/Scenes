import _DeleteCommand from "../abstractions/DeleteCommand.js";
import ModelDefinition from "../../modelDefinitions/Product.js";

export default class DeleteCommand extends _DeleteCommand {
    constructor(client_side_uuid) {
        super(
            ModelDefinition,
            client_side_uuid, 
        );
    }
}
