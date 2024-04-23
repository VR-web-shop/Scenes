import Sagas from "@vr-web-shop/sagas";
import ProductEntity from '../../models/ProductEntity.js';

class DeleteProductEntitySagaHandler extends Sagas.SagaHandler {
    constructor() {
        super("Delete Scene Product Entity");
    }

    async onReduce(params) {
        console.log('DeleteProductEntitySagaHandler.onReduce', params);
    }

    async onAction(params) {
        console.log('DeleteProductEntitySagaHandler.onAction', params);
    }
}

export default new DeleteProductEntitySagaHandler();
