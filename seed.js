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
import MeshMaterial from './src/models/MeshMaterial.js';

import SceneLight from './src/models/SceneLight.js';
import SceneLightType, { LIGHT_TYPE } from './src/models/SceneLightType.js';
import SceneStaticObject from './src/models/SceneStaticObject.js';
import SceneBasket from './src/models/SceneBasket.js';
import SceneCheckout from './src/models/SceneCheckout.js';
import SceneFloor from './src/models/SceneFloor.js';
import SceneProduct from './src/models/SceneProduct.js';

import SceneCamera from './src/models/SceneCamera.js';
import SceneBackground from './src/models/SceneBackground.js';

import ProductEntityState, { PRODUCT_ENTITY_STATES } from './src/models/ProductEntityState.js';
import ProductEntity from './src/models/ProductEntity.js';
import Product from './src/models/Product.js';

async function createDefaults() {
    await Database.sync({ force: true });

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
}

async function idempotenceCreate (model, data) {
    const dataValues = (await model.findOrCreate({ where: data }))[0].dataValues;
    return dataValues;
}

async function createDemoScene() {
    const scene = await idempotenceCreate(Scene, { name: 'Demo Scene' })
    const sceneCamera = await idempotenceCreate(SceneCamera, { SceneUuid: scene.uuid });
    const blackFabricTextureMap = await idempotenceCreate(Texture, { 
        name: 'Demo Black Fabric Map', 
        source: '/textures/black_fabric_basecolor.png', 
        texture_type_name: TEXTURE_TYPE.Map 
    });
    const blackFabricMaterial = await idempotenceCreate(Material, {
        name: 'Demo Black Fabric', 
        material_type_name: MATERIAL_TYPE.MeshStandardMaterial 
    });
    await idempotenceCreate(MaterialTexture, {
        material_uuid: blackFabricMaterial.uuid, 
        texture_uuid: blackFabricTextureMap.uuid 
    });
    const chairMesh = await idempotenceCreate(Mesh, { 
        name: 'Demo Chair', 
        source: '/meshes/chair.glb' 
    });

    const createCameras = async () => {
        const cameraPosition = await idempotenceCreate(Vector3D, { x: 0.000001, y: 0, z: 0 });
        const cameraRotation = await idempotenceCreate(Vector3D, { x: 0.000002, y: 0, z: 0 });
        const sceneCamera = await idempotenceCreate(SceneCamera, {
            position_uuid: cameraPosition.uuid,
            rotation_uuid: cameraRotation.uuid,
            scene_uuid: scene.uuid
        });
    }

    const createBackgrounds = async () => {
        const hex = '#CCCDDD';
        await idempotenceCreate(SceneBackground, { hex, scene_uuid: scene.uuid });
    }

    const createLights = async () => {
        const lightPosition = await idempotenceCreate(Vector3D, { x: 0.000001, y: 0, z: 0 });
        const lightRotation = await idempotenceCreate(Vector3D, { x: 0.000002, y: 0, z: 0 });
        await idempotenceCreate(SceneLight, {
            name: 'Demo Light',
            intensity: 1,
            position_uuid: lightPosition.uuid,
            rotation_uuid: lightRotation.uuid,
            scene_light_type_name: LIGHT_TYPE.DirectionalLight,
            scene_uuid: scene.uuid
        });  
    }

    const createFloors = async () => {
        const floorPosition = await idempotenceCreate(Vector3D, { x: 0.000003, y: 0, z: 0 });
        const floorRotation = await idempotenceCreate(Vector3D, { x: 0.000004, y: 0, z: 0 });
        const floorScale = await idempotenceCreate(Vector3D, { x: 1.000001, y: 1, z: 1 });
        const floorMesh = await idempotenceCreate(Mesh, { 
            name: 'Demo Floor', 
            source: '/meshes/floor.glb' 
        });
        
        await idempotenceCreate(SceneFloor, {
            name: 'Demo Floor',
            mesh_uuid: floorMesh.uuid,
            position_uuid: floorPosition.uuid, 
            rotation_uuid: floorRotation.uuid,
            scale_uuid: floorScale.uuid,
            scene_uuid: scene.uuid
        });

        await idempotenceCreate(MeshMaterial, {
            submesh_name: 'Demo Floor',
            material_uuid: blackFabricMaterial.uuid,
            mesh_uuid: floorMesh.uuid
        });
    }

    const createBaskets = async () => {
        const basketPosition = await idempotenceCreate(Vector3D, { x: 0.000005, y: 0, z: 0 });
        const basketSelectOffset = await idempotenceCreate(Vector3D, { x: 0.0000017, y: 0, z: 0 });
        const basketPlaceholderOffset = await idempotenceCreate(Vector3D, { x: 0.0000018, y: 0, z: 0 });
        const basketRotation = await idempotenceCreate(Vector3D, { x: 0.000006, y: 0, z: 0 });
        const basketScale = await idempotenceCreate(Vector3D, { x: 1.000002, y: 1, z: 1 });
        const basketMesh = await idempotenceCreate(Mesh, { 
            name: 'Demo Basket', 
            source: '/meshes/basket.glb' 
        });
        const placeholderMesh = await idempotenceCreate(Mesh, { 
            name: 'Demo Basket Placeholder', 
            source: '/meshes/placeholder.glb' 
        });
        await idempotenceCreate(MeshMaterial, {
            submesh_name: 'Demo Basket',
            material_uuid: blackFabricMaterial.uuid,
            mesh_uuid: basketMesh.uuid 
        });
        await idempotenceCreate(SceneBasket, {
            object_uuid: basketMesh.uuid, 
            placeholder_uuid: placeholderMesh.uuid, 
            position_uuid: basketPosition.uuid, 
            rotation_uuid: basketRotation.uuid,
            scale_uuid: basketScale.uuid,
            object_offset_uuid: basketSelectOffset.uuid,
            placeholder_offset_uuid: basketPlaceholderOffset.uuid,
            scene_uuid: scene.uuid
        });
    }

    const createCheckouts = async () => {
        const checkoutPosition = await idempotenceCreate(Vector3D, { x: 0.000007, y: 0, z: 0 });
        const checkoutRotation = await idempotenceCreate(Vector3D, { x: 0.000008, y: 0, z: 0 });
        const checkoutScale = await idempotenceCreate(Vector3D, { x: 1.000003, y: 1, z: 1 });
        const checkoutSurfaceOffset = await idempotenceCreate(Vector3D, { x: 0.000009, y: 0, z: 0 });
        const checkoutSurfaceSize = await idempotenceCreate(Vector3D, { x: 1.000004, y: 1, z: 1 });
        const checkoutUIOffset = await idempotenceCreate(Vector3D, { x: 0.0000011, y: 0, z: 0 });
        const checkoutUIRotation = await idempotenceCreate(Vector3D, { x: 0.0000012, y: 0, z: 0 });
        const checkoutMesh = await idempotenceCreate(Mesh, {
            name: 'Demo Checkout', 
            source: '/meshes/checkout.glb'
        });
        await idempotenceCreate(MeshMaterial, {
            submesh_name: 'Demo Checkout',
            material_uuid: blackFabricMaterial.uuid,
            mesh_uuid: checkoutMesh.uuid
        });
        await idempotenceCreate(SceneCheckout, {
            name: 'Demo Checkout',
            mesh_uuid: checkoutMesh.uuid,
            surface_offset_uuid: checkoutSurfaceOffset.uuid,
            surface_size_uuid: checkoutSurfaceSize.uuid,
            ui_offset_uuid: checkoutUIOffset.uuid,
            ui_rotation_uuid: checkoutUIRotation.uuid,
            position_uuid: checkoutPosition.uuid, 
            rotation_uuid: checkoutRotation.uuid,
            scale_uuid: checkoutScale.uuid,
            scene_uuid: scene.uuid
        });
    }

    const createProducts = async () => {
        const product = await idempotenceCreate(Product, { 
            uuid: '00000000-0000-0000-0000-000000000001',
            name: 'Demo Chair',
            description: 'A simple chair',
        });
        await idempotenceCreate(ProductEntity, {
            uuid: '00000000-0000-0000-0000-000000000002',
            product_uuid: product.uuid,
            product_entity_state_name: PRODUCT_ENTITY_STATES.AVAILABLE_FOR_PURCHASE
        });

        const chairPosition = await idempotenceCreate(Vector3D, { x: 0.000000613, y: 0, z: 0 });
        const chairRotation = await idempotenceCreate(Vector3D, { x: 0.000000614, y: 0, z: 0 });
        const chairChairScale = await idempotenceCreate(Vector3D, { x: 1.0000705, y: 1, z: 1 });
        await idempotenceCreate(SceneProduct, {
            name: 'Demo Product',
            product_uuid: product.uuid,
            position_uuid: chairPosition.uuid, 
            rotation_uuid: chairRotation.uuid,
            scale_uuid: chairChairScale.uuid,
            scene_uuid: scene.uuid
        });
    }

    const createStaticObjects = async () => {
        const staticChairPosition = await idempotenceCreate(Vector3D, { x: 0.00000215, y: 0, z: 0 });
        const staticChairRotation = await idempotenceCreate(Vector3D, { x: 0.00000416, y: 0, z: 0 });
        const staticChairScale = await idempotenceCreate(Vector3D, { x: 1.000006, y: 1, z: 1 });
        await idempotenceCreate(MeshMaterial, {
            submesh_name: 'Demo Static Chair',
            material_uuid: blackFabricMaterial.uuid,
            mesh_uuid: chairMesh.uuid
        });
        await idempotenceCreate(SceneStaticObject, {
            name: 'Demo Static Object',
            mesh_uuid: chairMesh.uuid,
            position_uuid: staticChairPosition.uuid, 
            rotation_uuid: staticChairRotation.uuid,
            scale_uuid: staticChairScale.uuid,
            scene_uuid: scene.uuid
        });
    }

    await createCameras();
    await createBackgrounds();
    await createLights();
    await createFloors();
    await createBaskets();
    await createCheckouts();
    await createProducts();
    await createStaticObjects();
}

(async () => {
    try {
        await Database.sync();
    } catch (error) {
        console.log('Error syncing database: ', error);
    }

    await createDefaults()
    await createDemoScene()
})();
