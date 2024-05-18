import _CreateCommand from "../abstractions/CreateCommand.js";
import ModelDefinition from "../../modelDefinitions/SceneBasketState.js";

export default class CreateCommand extends _CreateCommand {
    constructor(name, params) {
        super(
            ModelDefinition,
            name, 
            params, 
        );
    }
}
