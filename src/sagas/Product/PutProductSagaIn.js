import Sagas from "@vr-web-shop/sagas";
import Saga from "../../../../saga-v2/SagaHandler.js";
import Product from '../../models/Product.js';

const handler = new Saga.handler({
    eventName: "Put_Products_Product",
    nextEventName: "Put_Scenes_Product",
    type: Saga.types.CHAIN
}, Sagas.BrokerService);

handler.initiateEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    Product.create({
        uuid: response.params.client_side_uuid,
        name: response.params.name,
        description: response.params.description,
        price: response.params.price,
        thumbnail_source: response.params.thumbnail_source
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
    return response.params;
});

export default async (params) => {}
