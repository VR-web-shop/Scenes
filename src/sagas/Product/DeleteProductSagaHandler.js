import Sagas from "@vr-web-shop/sagas";
import Product from '../../models/Product.js';
class DeleteProductSagaHandler extends Sagas.SagaHandler {
    constructor() {
        super("Delete Scene Product");
    }

    async onAction(params) {
        console.log('DeleteProductSagaHandler.onAction', params);
    }
}

export default new DeleteProductSagaHandler();
