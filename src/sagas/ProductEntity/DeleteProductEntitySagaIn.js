import Sagas from "@vr-web-shop/sagas";
import ProductEntity from '../../models/ProductEntity.js';

const handler = new Sagas.SagaHandler.handler({
    eventName: "Delete_Products_Product_Entity",
    nextEventName: "Delete_Scenes_Product_Entity",
    type: Sagas.SagaHandler.types.CHAIN
});

handler.initiateEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    ProductEntity.update({
        product_entity_state_name: response.params.product_entity_state_name
    }, {
        where: {
            uuid: response.params.client_side_uuid
        }
    });
    
    return response.params;
});

handler.onCompleteEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    ProductEntity.destroy({
        where: {
            uuid: response.params.client_side_uuid
        }
    });

    return response.params;
});

handler.onReduceEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    ProductEntity.update({
        product_entity_state_name: "SYSTEM_FAILURE"
    }, {
        where: {
            uuid: response.params.client_side_uuid
        }
    });

    return response.params;
});

export default async (params) => {}