import Sagas from "@vr-web-shop/sagas";

class PutProductEntitySagaHandler extends Sagas.SagaHandler {
    constructor() {
        super("Put Scene Product Entity");
    }

    async onReduce(reply) {
    }

    async onAction(params) {
    }
}

export default new PutProductEntitySagaHandler();

