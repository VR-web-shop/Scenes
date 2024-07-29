import PutSceneProductCommand from "../commands/SceneProduct/PutCommand.js";
import PutSceneBasketCommand from "../commands/SceneBasket/PutCommand.js";
import PutVector3DCommand from "../commands/Vector3D/PutCommand.js";
import PutSceneCameraCommand from "../commands/SceneCamera/PutCommand.js";
import PutSceneCharacterCommand from "../commands/SceneCharacter/PutCommand.js";
import PutSceneBackgroundCommand from "../commands/SceneBackground/PutCommand.js";
import ReadProductCollectionQuery from "../queries/Product/ReadCollectionQuery.js";
import ModelCommandService from "../services/ModelCommandService.js";
import ModelQueryService from "../services/ModelQueryService.js";
import _db from "../../db/models/index.cjs";
import { v4 as uuidv4 } from "uuid";

const cmdService = new ModelCommandService();
const queryService = new ModelQueryService();

export default async (scene_client_side_uuid) => {
    await _db.sequelize.transaction(async (transaction) => {
        // Background
        const background_client_side_uuid = uuidv4();
        await cmdService.invoke(
            new PutSceneBackgroundCommand(background_client_side_uuid, {
                scene_client_side_uuid,
                hex: "#FFFFFF"
            }),
            { transaction }
        );

        // Camera
        const camera_client_side_uuid = uuidv4();
        const scene_position_client_side_uuid = uuidv4();
        const scene_rotation_client_side_uuid = uuidv4();
        await cmdService.invoke(
            new PutVector3DCommand(scene_position_client_side_uuid, {
                x: 0,
                y: 0,
                z: 0
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutVector3DCommand(scene_rotation_client_side_uuid, {
                x: 0,
                y: 0,
                z: 0
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutSceneCameraCommand(camera_client_side_uuid, {
                scene_client_side_uuid,
                position_client_side_uuid: scene_position_client_side_uuid,
                rotation_client_side_uuid: scene_rotation_client_side_uuid
            }),
            { transaction }
        );

        // Character
        const character_client_side_uuid = uuidv4();
        const character_position_client_side_uuid = uuidv4();
        const character_rotation_client_side_uuid = uuidv4();
        await cmdService.invoke(
            new PutVector3DCommand(character_position_client_side_uuid, {
                x: 0,
                y: 0,
                z: 0
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutVector3DCommand(character_rotation_client_side_uuid, {
                x: 0,
                y: 0,
                z: 0
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutSceneCharacterCommand(character_client_side_uuid, {
                scene_client_side_uuid,
                position_client_side_uuid: character_position_client_side_uuid,
                rotation_client_side_uuid: character_rotation_client_side_uuid
            }),
            { transaction }
        );

        // Basket
        const basket_client_side_uuid = uuidv4();
        const basket_position_client_side_uuid = uuidv4();
        const basket_rotation_client_side_uuid = uuidv4();
        const basket_scale_client_side_uuid = uuidv4();
        const object_offset_client_side_uuid = uuidv4();
        const placeholder_offset_client_side_uuid = uuidv4();
        const pocket_offset_client_side_uuid = uuidv4();
        const insert_area_offset_client_side_uuid = uuidv4();
        const insert_area_size_client_side_uuid = uuidv4();
        await cmdService.invoke(
            new PutVector3DCommand(basket_position_client_side_uuid, {
                x: 0,
                y: 0,
                z: 0
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutVector3DCommand(basket_rotation_client_side_uuid, {
                x: 0,
                y: 0,
                z: 0
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutVector3DCommand(basket_scale_client_side_uuid, {
                x: 1,
                y: 1,
                z: 1
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutVector3DCommand(object_offset_client_side_uuid, {
                x: 0,
                y: 0,
                z: 0
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutVector3DCommand(placeholder_offset_client_side_uuid, {
                x: 0,
                y: 0,
                z: 0
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutVector3DCommand(pocket_offset_client_side_uuid, {
                x: 0,
                y: 0,
                z: 0
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutVector3DCommand(insert_area_offset_client_side_uuid, {
                x: 0,
                y: 0,
                z: 0
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutVector3DCommand(insert_area_size_client_side_uuid, {
                x: 1,
                y: 1,
                z: 1
            }),
            { transaction }
        );
        await cmdService.invoke(
            new PutSceneBasketCommand(basket_client_side_uuid, {
                scene_client_side_uuid,
                position_client_side_uuid: basket_position_client_side_uuid,
                rotation_client_side_uuid: basket_rotation_client_side_uuid,
                scale_client_side_uuid: basket_scale_client_side_uuid,
                object_offset_client_side_uuid,
                placeholder_offset_client_side_uuid,
                pocket_offset_client_side_uuid,
                insert_area_offset_client_side_uuid,
                insert_area_size_client_side_uuid,
                scene_basket_state_name: "MeshRequired"
            }),
            { transaction }
        );

        // Product
        const { rows: products } = await queryService.invoke(
            new ReadProductCollectionQuery({page:1, limit: 1000}),
            { transaction }
        );
        for (const product of products) {
            const new_client_side_uuid = uuidv4();
            const product_client_side_uuid = product.client_side_uuid;
            const position_client_side_uuid = uuidv4();
            const rotation_client_side_uuid = uuidv4();
            const scale_client_side_uuid = uuidv4();
            const ui_offset_position_client_side_uuid = uuidv4();
            const ui_offset_rotation_client_side_uuid = uuidv4();
            const ui_scale_client_side_uuid = uuidv4();
            const scene_product_state_name = "MeshRequired";
            await cmdService.invoke(
                new PutVector3DCommand(position_client_side_uuid, {
                    x: 0,
                    y: 0,
                    z: 0
                }),
                { transaction }
            );
            await cmdService.invoke(
                new PutVector3DCommand(rotation_client_side_uuid, {
                    x: 0,
                    y: 0,
                    z: 0
                }),
                { transaction }
            );
            await cmdService.invoke(
                new PutVector3DCommand(scale_client_side_uuid, {
                    x: 1,
                    y: 1,
                    z: 1
                }),
                { transaction }
            );
            await cmdService.invoke(
                new PutVector3DCommand(ui_offset_position_client_side_uuid, {
                    x: 0,
                    y: 0,
                    z: 0
                }),
                { transaction }
            );
            await cmdService.invoke(
                new PutVector3DCommand(ui_offset_rotation_client_side_uuid, {
                    x: 0,
                    y: 0,
                    z: 0
                }),
                { transaction }
            );
            await cmdService.invoke(
                new PutVector3DCommand(ui_scale_client_side_uuid, {
                    x: 1,
                    y: 1,
                    z: 1
                }),
                { transaction }
            );
            await cmdService.invoke(
                new PutSceneProductCommand(new_client_side_uuid, {
                    scene_client_side_uuid,
                    product_client_side_uuid,
                    position_client_side_uuid,
                    rotation_client_side_uuid,
                    scale_client_side_uuid,
                    ui_offset_position_client_side_uuid,
                    ui_offset_rotation_client_side_uuid,
                    ui_scale_client_side_uuid,
                    scene_product_state_name
                }),
                { transaction }
            );
        }
    });
} 