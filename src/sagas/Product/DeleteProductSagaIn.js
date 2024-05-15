import Sagas from "@vr-web-shop/sagas";
import Product from '../../models/Product.js';

const handler = new Sagas.SagaHandler.handler({
    eventName: "Delete_Products_Product",
    nextEventName: "Delete_Scenes_Product",
    type: Sagas.SagaHandler.types.CHAIN
});

handler.initiateEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    return response.params;
});

handler.onCompleteEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    Product.destroy({
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

    return response.params;
});

export default async (params) => {}
