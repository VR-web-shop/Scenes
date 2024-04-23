import Sagas from "@vr-web-shop/sagas";
import Product from '../../models/Product.js';
class PutProductSagaHandler extends Sagas.SagaHandler {
    constructor() {
        super("Put Scene Product");
    }

    async onAction(params) {
        console.log('PutProductSagaHandler.onAction', params);
    }
}

export default new PutProductSagaHandler();
