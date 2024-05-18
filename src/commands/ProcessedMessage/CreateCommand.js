import _CreateCommand from "../abstractions/CreateCommand.js";
import ModelDefinition from "../../modelDefinitions/ProcessedMessage.js";

export default class CreateCommand extends _CreateCommand {
    constructor(subscriber_uuid, params) {
        super(
            ModelDefinition,
            subscriber_uuid, 
            params, 
        );
    }
}
