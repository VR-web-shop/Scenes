import _CreateCommand from "../abstractions/CreateCommand.js";
import ModelDefinition from "../../modelDefinitions/DistributedTransaction.js";

export default class CreateCommand extends _CreateCommand {
    constructor(transaction_uuid, params) {
        super(
            ModelDefinition,
            transaction_uuid, 
            params, 
        );
    }
}
