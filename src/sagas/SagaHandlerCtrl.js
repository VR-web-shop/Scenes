import DeleteProductSagaHandler from "./Product/DeleteProductSagaHandler.js";
import PutProductSagaHandler from "./Product/PutProductSagaHandler.js";

import DeleteProductEntitySagaHandler from "./ProductEntity/DeleteProductEntitySagaHandler.js";
import PutProductEntitySagaHandler from "./ProductEntity/PutProductEntitySagaHandler.js";

const handlers = {
    DeleteProductSagaHandler,
    PutProductSagaHandler,

    DeleteProductEntitySagaHandler,
    PutProductEntitySagaHandler,
};

export const startHandlers = () => {
    Object.values(handlers).forEach(handler => handler.start());
};

export const stopHandlers = () => {
    Object.values(handlers).forEach(handler => handler.stop());
};
