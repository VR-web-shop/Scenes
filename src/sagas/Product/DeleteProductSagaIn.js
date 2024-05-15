import Sagas from "@vr-web-shop/sagas";
import Saga from "../../../../saga-v2/SagaHandler.js";
import Product from '../../models/Product.js';

const handler = new Saga.handler({
    eventName: "Delete_Products_Product",
    nextEventName: "Delete_Scenes_Product",
    type: Saga.types.CHAIN
}, Sagas.BrokerService);

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
