import Sagas from "@vr-web-shop/sagas";
import CreateDTCommand from "../../commands/DistributedTransaction/CreateCommand.js";
import PutCommand from "../../commands/ProductEntity/PutCommand.js";
import DeleteCommand from "../../commands/ProductEntity/DeleteCommand.js";
import ModelCommandService from "../../services/ModelCommandService.js";
import db from "../../../db/models/index.js";

const eventName = "Delete_Products_Product_Entity";
const nextEventName = "Delete_Scenes_Product_Entity";
const type = Sagas.SagaHandler.types.CHAIN;

const handler = new Sagas.SagaHandler.handler({
    eventName,
    nextEventName,
    type
});

const idempotentMessageHandler = new Sagas.IdempotentMessageHandler(eventName, db);
const cmdService = new ModelCommandService();

handler.initiateEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    await db.sequelize.transaction(async (transaction) => {
        const { message_uuid, params } = response;
        if (message_uuid && await idempotentMessageHandler.existOrCreate(message_uuid, transaction)) {
            console.log(`${eventName}, message_uuid already processed: `, message_uuid);
            return;
        }

        await cmdService.invoke(
            new CreateDTCommand(distributed_transaction_transaction_uuid, { 
                distributed_transaction_state_name,
                transaction_message: JSON.stringify({ 
                    eventName, type, params, message_uuid 
                })
            }),
            { transaction }
        );

        await cmdService.invoke(
            new PutCommand(params.client_side_uuid, {
                product_entity_state_name: params.product_entity_state_name,
                product_client_side_uuid: params.product_client_side_uuid,
                distributed_transaction_transaction_uuid
            }),
            { transaction }
        );
    });
    
    return response.params;
});

handler.onCompleteEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    await db.sequelize.transaction(async (transaction) => {
        const { message_uuid, params } = response;
        if (message_uuid && await idempotentMessageHandler.existOrCreate(message_uuid, transaction)) {
            console.log(`${eventName}, message_uuid already processed: `, message_uuid);
            return;
        }

        await cmdService.invoke(
            new CreateDTCommand(distributed_transaction_transaction_uuid, { 
                distributed_transaction_state_name,
                transaction_message: JSON.stringify({ 
                    eventName, type, params, message_uuid 
                })
            }),
            { transaction }
        );

        await cmdService.invoke(
            new PutCommand(params.client_side_uuid, {
                product_entity_state_name: params.product_entity_state_name,
                product_client_side_uuid: params.product_client_side_uuid,
                distributed_transaction_transaction_uuid
            }),
            { transaction }
        );

        await cmdService.invoke(
            new DeleteCommand(params.client_side_uuid),
            { transaction }
        );
    });

    return response.params;
});

handler.onReduceEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    await db.sequelize.transaction(async (transaction) => {
        const { message_uuid, params } = response;
        if (message_uuid && await idempotentMessageHandler.existOrCreate(message_uuid, transaction)) {
            console.log(`${eventName}, message_uuid already processed: `, message_uuid);
            return;
        }

        await cmdService.invoke(
            new CreateDTCommand(distributed_transaction_transaction_uuid, { 
                distributed_transaction_state_name,
                transaction_message: JSON.stringify({ 
                    eventName, type, params, message_uuid 
                })
            }),
            { transaction }
        );

        await cmdService.invoke(
            new PutCommand(params.client_side_uuid, {
                product_entity_state_name: "SYSTEM_FAILURE",
                product_client_side_uuid: params.product_client_side_uuid,
                distributed_transaction_transaction_uuid
            }),
            { transaction }
        );
    });

    return response.params;
});

export default async (params) => {}
