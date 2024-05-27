import 'dotenv/config'
import './src/config/WebsocketConfig.js'
import './src/sagas/SagaHandlerCtrl.js'

import Sagas from "@vr-web-shop/sagas";

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import SwaggerController from './src/controllers/SwaggerController.js';
import MaterialController from './src/controllers/api/v1/MaterialController.js';
import MaterialTextureController from './src/controllers/api/v1/MaterialTextureController.js';
import MaterialTypeController from './src/controllers/api/v1/MaterialTypeController.js';
import MeshController from './src/controllers/api/v1/MeshController.js';
import MeshMaterialController from './src/controllers/api/v1/MeshMaterialController.js';
import ProductController from './src/controllers/api/v1/ProductController.js';
import ProductEntityController from './src/controllers/api/v1/ProductEntityController.js';
import ProductEntityStateController from './src/controllers/api/v1/ProductEntityStateController.js';
import SceneBackgroundController from './src/controllers/api/v1/SceneBackgroundController.js';
import SceneBasketController from './src/controllers/api/v1/SceneBasketController.js';
import SceneBasketStateController from './src/controllers/api/v1/SceneBasketStateController.js';
import SceneCameraController from './src/controllers/api/v1/SceneCameraController.js';
import SceneCharacterController from './src/controllers/api/v1/SceneCharacterController.js';
import SceneCheckoutController from './src/controllers/api/v1/SceneCheckoutController.js';
import SceneController from './src/controllers/api/v1/SceneController.js';
import SceneFloorController from './src/controllers/api/v1/SceneFloorController.js';
import SceneLightController from './src/controllers/api/v1/SceneLightController.js';
import SceneLightTypeController from './src/controllers/api/v1/SceneLightTypeController.js';
import SceneProductController from './src/controllers/api/v1/SceneProductController.js';
import SceneProductStateController from './src/controllers/api/v1/SceneProductStateController.js';
import SceneStaticObjectController from './src/controllers/api/v1/SceneStaticObjectController.js';
import TextureController from './src/controllers/api/v1/TextureController.js';
import TextureTypeController from './src/controllers/api/v1/TextureTypeController.js';
import Vector3DController from './src/controllers/api/v1/Vector3DController.js';

(async () => {
    const port = process.env.SERVER_PORT;
    const origin = process.env.CORS_ORIGINS.split(',');

    await Sagas.BrokerService.connect()
    const app = express()

    app.use(cors({
        origin: '*'
    }));

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(SwaggerController);
    app.use(MaterialController);
    app.use(MaterialTextureController);
    app.use(MaterialTypeController);
    app.use(MeshController);
    app.use(MeshMaterialController);
    app.use(ProductController);
    app.use(ProductEntityController);
    app.use(ProductEntityStateController);
    app.use(SceneBackgroundController);
    app.use(SceneBasketController);
    app.use(SceneBasketStateController);
    app.use(SceneCameraController);
    app.use(SceneCharacterController);
    app.use(SceneCheckoutController);
    app.use(SceneController);
    app.use(SceneFloorController);
    app.use(SceneLightController);
    app.use(SceneLightTypeController);
    app.use(SceneProductController);
    app.use(SceneProductStateController);
    app.use(SceneStaticObjectController);
    app.use(TextureController);
    app.use(TextureTypeController);
    app.use(Vector3DController);
    
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})()
