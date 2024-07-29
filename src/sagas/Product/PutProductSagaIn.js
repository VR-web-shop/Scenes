import Sagas from "@vr-web-shop/sagas";
import CreateDTCommand from "../../commands/DistributedTransaction/CreateCommand.js";
import PutCommand from "../../commands/Product/PutCommand.js";
import PutSceneProductCommand from "../../commands/SceneProduct/PutCommand.js";
import PutVector3DCommand from "../../commands/Vector3D/PutCommand.js";
import ModelCommandService from "../../services/ModelCommandService.js";
import ReadSceneCollectionQuery from "../../queries/Scene/ReadCollectionQuery.js";
import ReadCollectionSceneProductQuery from "../../queries/SceneProduct/ReadCollectionQuery.js";
import ModelQueryService from "../../services/ModelQueryService.js";
import db from "../../../db/models/index.cjs";
import { v4 as uuidv4 } from "uuid";
import WebsocketService from "../../services/WebsocketService.js";
import { Op } from "sequelize";

const eventName = "Put_Products_Product";
const nextEventName = "Put_Scenes_Product";
const type = Sagas.SagaHandler.types.CHAIN;

const handler = new Sagas.SagaHandler.handler({
    eventName,
    nextEventName,
    type
});

const idempotentMessageHandler = new Sagas.IdempotentMessageHandler(eventName, db);
const cmdService = new ModelCommandService();
const queryService = new ModelQueryService();

handler.initiateEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    await db.sequelize.transaction(async (transaction) => {
        const { message_uuid, params } = response;
        if (message_uuid && await idempotentMessageHandler.existOrCreate(message_uuid, transaction)) {
            console.log(`${eventName}, message_uuid already processed: `, message_uuid);
            return;
        }

        await cmdService.invoke(
            new CreateDTCommand(distributed_transaction_transaction_uuid, { 
                distributed_transaction_state_name,
                transaction_message: JSON.stringify({ 
                    eventName, type, params, message_uuid 
                })
            }),
            { transaction }
        );

        await cmdService.invoke(
            new PutCommand(params.client_side_uuid, {
                name: params.name,
                description: params.description,
                price: params.price,
                thumbnail_source: params.thumbnail_source,
                distributed_transaction_transaction_uuid
            }),
            { transaction }
        );
    });
    
    return response.params;
});

handler.onCompleteEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    await db.sequelize.transaction(async (transaction) => {
        const { message_uuid, params } = response;
        if (message_uuid && await idempotentMessageHandler.existOrCreate(message_uuid, transaction)) {
            console.log(`${eventName}, message_uuid already processed: `, message_uuid);
            return;
        }

        await cmdService.invoke(
            new CreateDTCommand(distributed_transaction_transaction_uuid, { 
                distributed_transaction_state_name,
                transaction_message: JSON.stringify({ 
                    eventName, type, params, message_uuid 
                })
            }),
            { transaction }
        );

        await cmdService.invoke(
            new PutCommand(params.client_side_uuid, {
                name: params.name,
                description: params.description,
                price: params.price,
                thumbnail_source: params.thumbnail_source,
                distributed_transaction_transaction_uuid
            }),
            { transaction }
        );
        
        addSceneProductsToScenes(params.client_side_uuid);
    });

    return response.params;
});

handler.onReduceEvent(async (
    distributed_transaction_transaction_uuid,
    distributed_transaction_state_name,
    response,
) => {
    await db.sequelize.transaction(async (transaction) => {
        const { message_uuid, params } = response;
        if (message_uuid && await idempotentMessageHandler.existOrCreate(message_uuid, transaction)) {
            console.log(`${eventName}, message_uuid already processed: `, message_uuid);
            return;
        }

        await cmdService.invoke(
            new CreateDTCommand(distributed_transaction_transaction_uuid, { 
                distributed_transaction_state_name,
                transaction_message: JSON.stringify({ 
                    eventName, type, params, message_uuid 
                })
            }),
            { transaction }
        );

        await cmdService.invoke(
            new PutCommand(params.client_side_uuid, {
                name: params.name,
                description: params.description,
                price: params.price,
                thumbnail_source: params.thumbnail_source,
                distributed_transaction_transaction_uuid
            }),
            { transaction }
        );
    });
    
    return response.params;
});

/**
 * If a new proudct is added, all existing scenes should have a scene product added
 * referencing the new product.
 */
const addSceneProductsToScenes = async (product_client_side_uuid) => {
    
    /**
     * Find all scenes
     */
    const { rows: scenes } = await new ReadSceneCollectionQuery({
        limit: 10000,
        page: 1,
    }).execute(db);

    /**
     * For each scene, check if a scene product already exists for the new product
     * If not, create a new scene product
     * If scene is active, announce to clients on websocket
     */
    for (const scene of scenes) {
        
        const scene_client_side_uuid = scene.client_side_uuid;
        // Check if scene already has scene product
        const { rows: exisitingSceneProducts} = await queryService.invoke(
            new ReadCollectionSceneProductQuery({
                page: 1,
                limit: 10000,
                where: [{
                    table: 'SceneProductDescriptions',
                    column: 'scene_client_side_uuid',
                    operator: Op.eq,
                    key: 'sceneClientSideUuid',
                    value: scene_client_side_uuid
                },{
                    table: 'SceneProductDescriptions',
                    column: 'product_client_side_uuid',
                    operator: Op.eq,
                    key: 'productClientSideUuid',
                    value: product_client_side_uuid
                }]
            })
        );
        
        if (exisitingSceneProducts.length > 0) {
            continue;
        }
        
        const ui_offset_position_client_side_uuid = uuidv4();
        const ui_offset_rotation_client_side_uuid = uuidv4();
        const ui_scale_client_side_uuid = uuidv4();
        const scale_client_side_uuid = uuidv4();
        const rotation_client_side_uuid = uuidv4();
        const position_client_side_uuid = uuidv4();
        const client_side_uuid = uuidv4();

        await db.sequelize.transaction(async (transaction) => {
            // Create Vector3Ds
            for (const vec of [
                {uuid: ui_offset_position_client_side_uuid, val: {x: 0, y: 0, z: 0}},
                {uuid: ui_offset_rotation_client_side_uuid, val: {x: 0, y: 0, z: 0}},
                {uuid: ui_scale_client_side_uuid, val: {x: 1, y: 1, z: 1}},
                {uuid: scale_client_side_uuid, val: {x: 1, y: 1, z: 1}},
                {uuid: rotation_client_side_uuid, val: {x: 0, y: 0, z: 0}},
                {uuid: position_client_side_uuid, val: {x: 0, y: 0, z: 0}},
            ]) {
                await cmdService.invoke(
                    new PutVector3DCommand(vec.uuid, vec.val),
                    { transaction }
                );
            }

            // Create SceneProduct
            const sceneProduct = {
                product_client_side_uuid,
                scene_product_state_name: "MeshRequired",
                scene_client_side_uuid,
                ui_scale_client_side_uuid,
                ui_offset_rotation_client_side_uuid,
                ui_offset_position_client_side_uuid,
                scale_client_side_uuid,
                rotation_client_side_uuid,
                position_client_side_uuid,
            }
            
            await cmdService.invoke(
                new PutSceneProductCommand(client_side_uuid, sceneProduct),
                { transaction }
            );

            // if scene is active, announce to clients
            if (scene.active) {
                WebsocketService.updateSceneProduct({
                    client_side_uuid,
                    ...sceneProduct
                });
            }
        });
    }
}

export default async (params) => {}
