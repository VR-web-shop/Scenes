import Sagas from "@vr-web-shop/sagas";
import ProductEntity from '../../models/ProductEntity.js';

const handler = new Sagas.SagaHandler.handler({
    eventName: "Put_Shopping_Cart_Product_Entity",
    nextEventName: "Put_Scenes_Shopping_Cart_Product_Entity",
    type: Sagas.SagaHandler.types.CHAIN
});

handler.initiateEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {    
    console.log("ProductEntity updated: ", response);
    ProductEntity.update({
        product_entity_state_name: response.params.product_entity_state_name,
        product_uuid: response.params.product_client_side_uuid,
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
    return response.params;
});

handler.onReduceEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    console.log("ProductEntity updated: ", response);
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
