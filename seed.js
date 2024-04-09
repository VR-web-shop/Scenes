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

async function createDefaults() {
    await Database.sync({ force: true });
    await removeConstraints();

    // Create Default types and states
    for (const name of Object.values(MATERIAL_TYPE)) {
        await MaterialType.findOrCreate({ where: { name } });
    }
    for (const name of Object.values(TEXTURE_TYPE)) {
        await TextureType.findOrCreate({ where: { name } });
    }
    for (const name of Object.values(LIGHT_TYPE)) {
        await SceneLightType.findOrCreate({ where: { name } });
    }
    for (const name of Object.values(PRODUCT_ENTITY_STATES)) {
        await ProductEntityState.findOrCreate({ where: { name } });
    }
    for (const name of Object.values(SCENE_PRODUCT_STATE)) {
        await SceneProductState.findOrCreate({ where: { name } });
    }
    for (const name of Object.values(SCENE_BASKET_STATE)) {
        await SceneBasketState.findOrCreate({ where: { name } });
    }

    const { S3_CDN_URL } = process.env;
    const { textures } = demoScene;
    for (const texture of textures) {
        await Texture.create({ 
            ...texture, 
            source: S3_CDN_URL + "/" + texture.source 
        });
    }

    const { materials } = demoScene;
    for (const material of materials) {
        const materialData = await Material.create({
            name: material.name,
            material_type_name: material.material_type_name
        });
        for (const texture of material.textures) {
            const textureData = await Texture.findOne({ where: { 
                name: texture.name 
            }});
            await MaterialTexture.create({
                material_uuid: materialData.dataValues.uuid,
                texture_uuid: textureData.dataValues.uuid
            });
        }
    }

    const { meshes } = demoScene;
    for (const mesh of meshes) {
        const meshData = await Mesh.create({ 
            name: mesh.name, 
            source: S3_CDN_URL + "/" + mesh.source 
        });
        for (const meshMaterial of mesh.meshMaterials) {
            const materialData = await Material.findOne({ where: {
                name: meshMaterial.material_name
            }});
            await MeshMaterial.create({
                submesh_name: meshMaterial.submesh_name,
                material_uuid: materialData.dataValues.uuid,
                mesh_uuid: meshData.dataValues.uuid
            });
        }
    }

    const scene = await Scene.create({ name: demoScene.name, active: true });
    const { lights } = demoScene 
    for (const light of lights) {
        const lightData = await SceneLight.create({
            name: light.name,
            intensity: light.intensity,
            scene_light_type_name: light.scene_light_type_name,
            hexColor: light.hexColor,
            scene_uuid: scene.dataValues.uuid
        });

        const position = await lightData.getPosition();
        const rotation = await lightData.getRotation();

        await Vector3D.update({ x: light.position.x, y: light.position.y, z: light.position.z }, { where: { uuid: position.dataValues.uuid }});
        await Vector3D.update({ x: light.rotation.x, y: light.rotation.y, z: light.rotation.z }, { where: { uuid: rotation.dataValues.uuid }});
    }

    const { floors } = demoScene;
    for (const floor of floors) {
        const meshData = await Mesh.findOne({ where: { name: floor.mesh_name }});
        const floorData = await SceneFloor.create({
            name: floor.name,
            mesh_uuid: meshData.dataValues.uuid,
            scene_uuid: scene.dataValues.uuid
        });
        const position = await floorData.getPosition();
        const rotation = await floorData.getRotation();
        const scale = await floorData.getScale();

        await Vector3D.update({ x: floor.position.x, y: floor.position.y, z: floor.position.z }, { where: { uuid: position.dataValues.uuid }});
        await Vector3D.update({ x: floor.rotation.x, y: floor.rotation.y, z: floor.rotation.z }, { where: { uuid: rotation.dataValues.uuid }});
        await Vector3D.update({ x: floor.scale.x, y: floor.scale.y, z: floor.scale.z }, { where: { uuid: scale.dataValues.uuid }});
    }

    const { checkouts } = demoScene;
    for (const checkout of checkouts) {
        const meshData = await Mesh.findOne({ where: { name: checkout.mesh_name }});
        const checkoutData = await SceneCheckout.create({
            name: checkout.name,
            mesh_uuid: meshData.dataValues.uuid,
            scene_uuid: scene.dataValues.uuid
        });
        const position = await checkoutData.getPosition();
        const rotation = await checkoutData.getRotation();
        const scale = await checkoutData.getScale();
        const surfaceOffset = await checkoutData.getSurfaceOffset();
        const surfaceSize = await checkoutData.getSurfaceSize();
        const uiOffsetPosition = await checkoutData.getUIOffsetPosition();
        const uiOffsetRotation = await checkoutData.getUIOffsetRotation();
        const uiOffsetScale = await checkoutData.getUIScale();

        await Vector3D.update({ x: checkout.position.x, y: checkout.position.y, z: checkout.position.z }, { where: { uuid: position.dataValues.uuid }});
        await Vector3D.update({ x: checkout.rotation.x, y: checkout.rotation.y, z: checkout.rotation.z }, { where: { uuid: rotation.dataValues.uuid }});
        await Vector3D.update({ x: checkout.scale.x, y: checkout.scale.y, z: checkout.scale.z }, { where: { uuid: scale.dataValues.uuid }});
        await Vector3D.update({ x: checkout.surface_offset.x, y: checkout.surface_offset.y, z: checkout.surface_offset.z }, { where: { uuid: surfaceOffset.dataValues.uuid }});
        await Vector3D.update({ x: checkout.surface_size.x, y: checkout.surface_size.y, z: checkout.surface_size.z }, { where: { uuid: surfaceSize.dataValues.uuid }});
        await Vector3D.update({ x: checkout.ui_offset_position.x, y: checkout.ui_offset_position.y, z: checkout.ui_offset_position.z }, { where: { uuid: uiOffsetPosition.dataValues.uuid }});
        await Vector3D.update({ x: checkout.ui_offset_rotation.x, y: checkout.ui_offset_rotation.y, z: checkout.ui_offset_rotation.z }, { where: { uuid: uiOffsetRotation.dataValues.uuid }});
        await Vector3D.update({ x: checkout.ui_offset_scale.x, y: checkout.ui_offset_scale.y, z: checkout.ui_offset_scale.z }, { where: { uuid: uiOffsetScale.dataValues.uuid }});
    }

    const { static_objects } = demoScene;
    for (const staticObject of static_objects) {
        const meshData = await Mesh.findOne({ where: { name: staticObject.mesh_name }});
        const sceneStaticObjectData = await SceneStaticObject.create({
            name: staticObject.name,
            mesh_uuid: meshData.dataValues.uuid,
            scene_uuid: scene.dataValues.uuid
        });

        const position = await sceneStaticObjectData.getPosition();
        const rotation = await sceneStaticObjectData.getRotation();
        const scale = await sceneStaticObjectData.getScale();

        await Vector3D.update({ x: staticObject.position.x, y: staticObject.position.y, z: staticObject.position.z }, { where: { uuid: position.dataValues.uuid }});
        await Vector3D.update({ x: staticObject.rotation.x, y: staticObject.rotation.y, z: staticObject.rotation.z }, { where: { uuid: rotation.dataValues.uuid }});
        await Vector3D.update({ x: staticObject.scale.x, y: staticObject.scale.y, z: staticObject.scale.z }, { where: { uuid: scale.dataValues.uuid }});
    }

    const { scene_products } = demoScene;
    for (const sceneProduct of scene_products) {
        const productData = await Product.create({
            uuid: sceneProduct.Product.uuid,
            name: sceneProduct.Product.name,
            description: sceneProduct.Product.description,
            price: sceneProduct.Product.price,
            thumbnail_source: S3_CDN_URL + "/" + sceneProduct.Product.thumbnail_source
        });
        const meshData = await Mesh.findOne({ where: { 
            name: sceneProduct.mesh_name
        }});

        const sceneProductData = await SceneProduct.create({
            name: sceneProduct.name,
            product_uuid: productData.dataValues.uuid,
            scene_uuid: scene.dataValues.uuid,
            mesh_uuid: meshData.dataValues.uuid
        });

        const position = await sceneProductData.getPosition();
        const rotation = await sceneProductData.getRotation();
        const scale = await sceneProductData.getScale();
        const uiOffsetPosition = await sceneProductData.getUIOffsetPosition();
        const uiOffsetRotation = await sceneProductData.getUIOffsetRotation();
        const uiOffsetScale = await sceneProductData.getUIScale();

        await Vector3D.update({ x: sceneProduct.position.x, y: sceneProduct.position.y, z: sceneProduct.position.z }, { where: { uuid: position.dataValues.uuid }});
        await Vector3D.update({ x: sceneProduct.rotation.x, y: sceneProduct.rotation.y, z: sceneProduct.rotation.z }, { where: { uuid: rotation.dataValues.uuid }});
        await Vector3D.update({ x: sceneProduct.scale.x, y: sceneProduct.scale.y, z: sceneProduct.scale.z }, { where: { uuid: scale.dataValues.uuid }});
        await Vector3D.update({ x: sceneProduct.ui_offset_position.x, y: sceneProduct.ui_offset_position.y, z: sceneProduct.ui_offset_position.z }, { where: { uuid: uiOffsetPosition.dataValues.uuid }});
        await Vector3D.update({ x: sceneProduct.ui_offset_rotation.x, y: sceneProduct.ui_offset_rotation.y, z: sceneProduct.ui_offset_rotation.z }, { where: { uuid: uiOffsetRotation.dataValues.uuid }});
        await Vector3D.update({ x: sceneProduct.ui_offset_scale.x, y: sceneProduct.ui_offset_scale.y, z: sceneProduct.ui_offset_scale.z }, { where: { uuid: uiOffsetScale.dataValues.uuid }});
    }

    const { basket } = demoScene;
    (async () => {
    const basketObjectMeshData = await Mesh.findOne({ where: { name: basket.basket_mesh_name }});
    const basketPlaceholderMeshData = await Mesh.findOne({ where: { name: basket.products_mesh_name }});
    const basketPocketMeshData = await Mesh.findOne({ where: { name: basket.pocket_mesh_name }});
    const basketData = await SceneBasket.findOne({ where: {
        scene_uuid: scene.dataValues.uuid
    }}); 
    
    basketData.update({
        object_uuid: basketObjectMeshData.dataValues.uuid,
        placeholder_uuid: basketPlaceholderMeshData.dataValues.uuid,
        pocket_uuid: basketPocketMeshData.dataValues.uuid
    });

    const position = await basketData.getPosition();
    const rotation = await basketData.getRotation();
    const scale = await basketData.getScale();
    const objectOffset = await basketData.getObjectOffset();
    const placeholderOffset = await basketData.getPlaceholderOffset();
    const pocketOffset = await basketData.getPocketOffset();
    const insertAreaOffset = await basketData.getInsertAreaOffset();
    const insertAreaSize = await basketData.getInsertAreaSize();

    await Vector3D.update({ x: basket.position.x, y: basket.position.y, z: basket.position.z }, { where: { uuid: position.dataValues.uuid }});
    await Vector3D.update({ x: basket.rotation.x, y: basket.rotation.y, z: basket.rotation.z }, { where: { uuid: rotation.dataValues.uuid }});
    await Vector3D.update({ x: basket.scale.x, y: basket.scale.y, z: basket.scale.z }, { where: { uuid: scale.uuid }});
    await Vector3D.update({ x: basket.object_offset.x, y: basket.object_offset.y, z: basket.object_offset.z }, { where: { uuid: objectOffset.dataValues.uuid }});
    await Vector3D.update({ x: basket.placeholder_offset.x, y: basket.placeholder_offset.y, z: basket.placeholder_offset.z }, { where: { uuid: placeholderOffset.dataValues.uuid }});
    await Vector3D.update({ x: basket.pocket_offset.x, y: basket.pocket_offset.y, z: basket.pocket_offset.z }, { where: { uuid: pocketOffset.dataValues.uuid }});
    await Vector3D.update({ x: basket.insert_area_offset.x, y: basket.insert_area_offset.y, z: basket.insert_area_offset.z }, { where: { uuid: insertAreaOffset.dataValues.uuid }});
    await Vector3D.update({ x: basket.insert_area_size.x, y: basket.insert_area_size.y, z: basket.insert_area_size.z }, { where: { uuid: insertAreaSize.dataValues.uuid }});
    })();

    const { character } = demoScene;
    (async () => {
        const characterData = await SceneCharacter.findOne({ where: { 
            scene_uuid: scene.dataValues.uuid
        }});
        const position = await characterData.getPosition();
        const rotation = await characterData.getRotation();

        await Vector3D.update({ x: character.position.x, y: character.position.y, z: character.position.z }, { where: { uuid: position.dataValues.uuid }});
        await Vector3D.update({ x: character.rotation.x, y: character.rotation.y, z: character.rotation.z }, { where: { uuid: rotation.dataValues.uuid }});
    })();

    const { camera } = demoScene;
    (async () => {
        const cameraData = await SceneCamera.findOne({ where: { 
            scene_uuid: scene.dataValues.uuid
        }});
        const position = await cameraData.getPosition();
        const rotation = await cameraData.getRotation();

        await Vector3D.update({ x: camera.position.x, y: camera.position.y, z: camera.position.z }, { where: { uuid: position.dataValues.uuid }});
        await Vector3D.update({ x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z }, { where: { uuid: rotation.dataValues.uuid }});
    })();

    const { background } = demoScene;
    (async () => {
        const backgroundData = await SceneBackground.findOne({ where: { 
            scene_uuid: scene.dataValues.uuid
        }});
        backgroundData.update({ hex: background.hex });
    })();
}

(async () => {
    try {
        await Database.sync({ force: true });
    } catch (error) {
        console.log('Error syncing database: ', error);
    }

    await createDefaults()
})();
