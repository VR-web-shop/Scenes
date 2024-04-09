import 'dotenv/config'
import Database from './src/models/Database.js';

import Scene from './src/models/Scene.js';
import Vector3D from './src/models/Vector3D.js';

import Material from './src/models/Material.js';
import MaterialTexture from './src/models/MaterialTexture.js';
import MaterialType, { MATERIAL_TYPE } from './src/models/MaterialType.js';

import Texture from './src/models/Texture.js';
import TextureType, { TEXTURE_TYPE } from './src/models/TextureType.js';

import Mesh from './src/models/Mesh.js';
import MeshMaterial, { removeConstraints } from './src/models/MeshMaterial.js';

import SceneLight from './src/models/SceneLight.js';
import SceneLightType, { LIGHT_TYPE } from './src/models/SceneLightType.js';
import SceneStaticObject from './src/models/SceneStaticObject.js';
import SceneBasket from './src/models/SceneBasket.js';
import SceneBasketState, { SCENE_BASKET_STATE } from './src/models/SceneBasketState.js';
import SceneCheckout from './src/models/SceneCheckout.js';
import SceneFloor from './src/models/SceneFloor.js';
import SceneProduct from './src/models/SceneProduct.js';
import SceneProductState, { SCENE_PRODUCT_STATE } from './src/models/SceneProductState.js';
import SceneCharacter from './src/models/SceneCharacter.js';

import SceneCamera from './src/models/SceneCamera.js';
import SceneBackground from './src/models/SceneBackground.js';

import ProductEntityState, { PRODUCT_ENTITY_STATES } from './src/models/ProductEntityState.js';
import ProductEntity from './src/models/ProductEntity.js';
import Product from './src/models/Product.js';

import demoScene from './demo_scene.json' assert { type: "json" };
import fs from 'fs'
const newFilePath = './demo_scene_out.json';
(async () => {
    const { lights } = demoScene 
    for (const light of lights) {
        const lightData = await SceneLight.findOne({ where: {
            name: light.name,
        }, include: [
            { model: Vector3D, as: 'Position' },
            { model: Vector3D, as: 'Rotation' },
        ]});

        if (!lightData) {
            console.error(`Light not found: ${light.name}`);
            continue;
        }

        light.position.x = lightData.Position.x;
        light.position.y = lightData.Position.y;
        light.position.z = lightData.Position.z;

        light.rotation.x = lightData.Rotation.x;
        light.rotation.y = lightData.Rotation.y;
        light.rotation.z = lightData.Rotation.z;

        light.hexColor = lightData.hexColor;
        light.intensity = lightData.intensity;
    }

    const { floors } = demoScene;
    for (const floor of floors) {
        const floorData = await SceneFloor.findOne({ where: {
            name: floor.name,
        }, include: [
            { model: Vector3D, as: 'Position' },
            { model: Vector3D, as: 'Rotation' },
            { model: Vector3D, as: 'Scale' },
        ]});

        if (!floorData) {
            console.error(`Floor not found: ${floor.name}`);
            continue;
        }

        floor.position.x = floorData.Position.x;
        floor.position.y = floorData.Position.y;
        floor.position.z = floorData.Position.z;

        floor.rotation.x = floorData.Rotation.x;
        floor.rotation.y = floorData.Rotation.y;
        floor.rotation.z = floorData.Rotation.z;

        floor.scale.x = floorData.Scale.x;
        floor.scale.y = floorData.Scale.y;
        floor.scale.z = floorData.Scale.z;
    }

    const { checkouts } = demoScene;
    for (const checkout of checkouts) {
        const checkoutData = await SceneCheckout.findOne({ where: {
            name: checkout.name,
        }, include: [
            { model: Vector3D, as: 'Position' },
            { model: Vector3D, as: 'Rotation' },
            { model: Vector3D, as: 'Scale' },
            { model: Vector3D, as: 'UIOffsetPosition' },
            { model: Vector3D, as: 'UIOffsetRotation' },
            { model: Vector3D, as: 'UIScale' }
        ]});

        if (!checkoutData) {
            console.error(`Checkout not found: ${checkout.name}`);
            continue;
        }

        checkout.position.x = checkoutData.Position.x;
        checkout.position.y = checkoutData.Position.y;
        checkout.position.z = checkoutData.Position.z;

        checkout.rotation.x = checkoutData.Rotation.x;
        checkout.rotation.y = checkoutData.Rotation.y;
        checkout.rotation.z = checkoutData.Rotation.z;

        checkout.scale.x = checkoutData.Scale.x;
        checkout.scale.y = checkoutData.Scale.y;
        checkout.scale.z = checkoutData.Scale.z;

        checkout.ui_offset_position.x = checkoutData.UIOffsetPosition.x;
        checkout.ui_offset_position.y = checkoutData.UIOffsetPosition.y;
        checkout.ui_offset_position.z = checkoutData.UIOffsetPosition.z;

        checkout.ui_offset_rotation.x = checkoutData.UIOffsetRotation.x;
        checkout.ui_offset_rotation.y = checkoutData.UIOffsetRotation.y;
        checkout.ui_offset_rotation.z = checkoutData.UIOffsetRotation.z;

        checkout.ui_offset_scale.x = checkoutData.UIScale.x;
        checkout.ui_offset_scale.y = checkoutData.UIScale.y;
        checkout.ui_offset_scale.z = checkoutData.UIScale.z;
    }

    const { static_objects } = demoScene;
    for (const staticObject of static_objects) {
        const staticObjectData = await SceneStaticObject.findOne({ where: {
            name: staticObject.name,            
        }, include: [
            { model: Vector3D, as: 'Position' },
            { model: Vector3D, as: 'Rotation' },
            { model: Vector3D, as: 'Scale' },
        ]});

        if (!staticObjectData) {
            console.error(`Static Object not found: ${staticObject.name}`);
            continue;
        }

        staticObject.position.x = staticObjectData.Position.x;
        staticObject.position.y = staticObjectData.Position.y;
        staticObject.position.z = staticObjectData.Position.z;

        staticObject.rotation.x = staticObjectData.Rotation.x;
        staticObject.rotation.y = staticObjectData.Rotation.y;
        staticObject.rotation.z = staticObjectData.Rotation.z;

        staticObject.scale.x = staticObjectData.Scale.x;
        staticObject.scale.y = staticObjectData.Scale.y;
        staticObject.scale.z = staticObjectData.Scale.z;
    }

    const { scene_products } = demoScene;
    for (const sceneProduct of scene_products) {
        const product = await Product.findOne({ where: {
            name: sceneProduct.Product.name,
        }});
        if (!product) {
            console.error(`Product not found: ${sceneProduct.Product.name}`);
            continue;
        }
        const sceneProductData = await SceneProduct.findOne({ where: {
            product_uuid: product.uuid,
        }, include: [
            { model: Vector3D, as: 'Position' },
            { model: Vector3D, as: 'Rotation' },
            { model: Vector3D, as: 'Scale' },
            { model: Vector3D, as: 'UIOffsetPosition' },
            { model: Vector3D, as: 'UIOffsetRotation' },
            { model: Vector3D, as: 'UIScale' }
        ]});

        sceneProduct.position.x = sceneProductData.Position.x;
        sceneProduct.position.y = sceneProductData.Position.y;
        sceneProduct.position.z = sceneProductData.Position.z;

        sceneProduct.rotation.x = sceneProductData.Rotation.x;
        sceneProduct.rotation.y = sceneProductData.Rotation.y;
        sceneProduct.rotation.z = sceneProductData.Rotation.z;

        sceneProduct.scale.x = sceneProductData.Scale.x;
        sceneProduct.scale.y = sceneProductData.Scale.y;
        sceneProduct.scale.z = sceneProductData.Scale.z;

        sceneProduct.ui_offset_position.x = sceneProductData.UIOffsetPosition.x;
        sceneProduct.ui_offset_position.y = sceneProductData.UIOffsetPosition.y;
        sceneProduct.ui_offset_position.z = sceneProductData.UIOffsetPosition.z;

        sceneProduct.ui_offset_rotation.x = sceneProductData.UIOffsetRotation.x;
        sceneProduct.ui_offset_rotation.y = sceneProductData.UIOffsetRotation.y;
        sceneProduct.ui_offset_rotation.z = sceneProductData.UIOffsetRotation.z;

        sceneProduct.ui_offset_scale.x = sceneProductData.UIScale.x;
        sceneProduct.ui_offset_scale.y = sceneProductData.UIScale.y;
        sceneProduct.ui_offset_scale.z = sceneProductData.UIScale.z;
    }

    const activeScene = await Scene.findOne({ where: {
        name: demoScene.name,
    }});
    if (!activeScene) {
        console.error(`Scene not found: ${demoScene.name}`);
    }

    const { basket } = demoScene;
    (async () => {
        const basketData = await SceneBasket.findOne({ where: {
            scene_uuid: activeScene.uuid,
        }, include: [
            { model: Vector3D, as: 'Position' },
            { model: Vector3D, as: 'Rotation' },
            { model: Vector3D, as: 'Scale' },
            { model: Vector3D, as: 'ObjectOffset' },
            { model: Vector3D, as: 'PlaceholderOffset' },
            { model: Vector3D, as: 'PocketOffset' },
            { model: Vector3D, as: 'InsertAreaOffset' },
            { model: Vector3D, as: 'InsertAreaSize' }
        ]});

        if (!basketData) {
            console.error(`Basket not found`);
        }

        basket.position.x = basketData.Position.x;
        basket.position.y = basketData.Position.y;
        basket.position.z = basketData.Position.z;

        basket.rotation.x = basketData.Rotation.x;
        basket.rotation.y = basketData.Rotation.y;
        basket.rotation.z = basketData.Rotation.z;

        basket.scale.x = basketData.Scale.x;
        basket.scale.y = basketData.Scale.y;
        basket.scale.z = basketData.Scale.z;

        basket.object_offset.x = basketData.ObjectOffset.x;
        basket.object_offset.y = basketData.ObjectOffset.y;
        basket.object_offset.z = basketData.ObjectOffset.z;

        basket.placeholder_offset.x = basketData.PlaceholderOffset.x;
        basket.placeholder_offset.y = basketData.PlaceholderOffset.y;
        basket.placeholder_offset.z = basketData.PlaceholderOffset.z;

        basket.pocket_offset.x = basketData.PocketOffset.x;
        basket.pocket_offset.y = basketData.PocketOffset.y;
        basket.pocket_offset.z = basketData.PocketOffset.z;

        basket.insert_area_offset.x = basketData.InsertAreaOffset.x;
        basket.insert_area_offset.y = basketData.InsertAreaOffset.y;
        basket.insert_area_offset.z = basketData.InsertAreaOffset.z;

        basket.insert_area_size.x = basketData.InsertAreaSize.x;
        basket.insert_area_size.y = basketData.InsertAreaSize.y;
        basket.insert_area_size.z = basketData.InsertAreaSize.z;
    })();

    const { character } = demoScene;
    (async () => {
        const characterData = await SceneCharacter.findOne({ where: {
            scene_uuid: activeScene.uuid,
        }, include: [
            { model: Vector3D, as: 'Position' },
            { model: Vector3D, as: 'Rotation' },
        ]});

        if (!characterData) {
            console.error(`Character not found`);
        }

        character.position.x = characterData.Position.x;
        character.position.y = characterData.Position.y;
        character.position.z = characterData.Position.z;

        character.rotation.x = characterData.Rotation.x;
        character.rotation.y = characterData.Rotation.y;
        character.rotation.z = characterData.Rotation.z;
    })();

    const { camera } = demoScene;
    (async () => {
        const cameraData = await SceneCamera.findOne({ where: {
            scene_uuid: activeScene.uuid,
        }, include: [
            { model: Vector3D, as: 'Position' },
            { model: Vector3D, as: 'Rotation' },
        ]});

        if (!cameraData) {
            console.error(`Camera not found`);
        }

        camera.position.x = cameraData.Position.x;
        camera.position.y = cameraData.Position.y;
        camera.position.z = cameraData.Position.z;

        camera.rotation.x = cameraData.Rotation.x;
        camera.rotation.y = cameraData.Rotation.y;
        camera.rotation.z = cameraData.Rotation.z;
    })();

    const { background } = demoScene;
    (async () => {
        const backgroundData = await SceneBackground.findOne({ where: { 
            scene_uuid: activeScene.uuid
        }});

        if (!backgroundData) {
            console.error(`Background not found`);
        }

        background.hex = backgroundData.hex;
    })();

    // Save the new file
    fs.writeFileSync(newFilePath, JSON.stringify(demoScene, null, 4));

})();
