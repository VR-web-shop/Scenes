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
}

async function idempotenceCreate (model, data) {
    const dataValues = (await model.create(data)).dataValues;
    return dataValues;
}

async function createDemoScene() {
    const scene = await idempotenceCreate(Scene, { name: 'Demo Scene' })
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
    const basketMesh = await idempotenceCreate(Mesh, { 
        name: 'Demo Basket', 
        source: '/meshes/basket.glb' 
    });
    const placeholderMesh = await idempotenceCreate(Mesh, { 
        name: 'Demo Basket Placeholder', 
        source: '/meshes/placeholder.glb' 
    });


    const createLights = async () => {
        await idempotenceCreate(SceneLight, {
            name: 'Demo Light',
            intensity: 1,
            scene_light_type_name: LIGHT_TYPE.DirectionalLight,
            scene_uuid: scene.uuid
        });  
    }

    const createFloors = async () => {
        const floorMesh = await idempotenceCreate(Mesh, { 
            name: 'Demo Floor', 
            source: '/meshes/floor.glb' 
        });
        
        await idempotenceCreate(SceneFloor, {
            name: 'Demo Floor',
            mesh_uuid: floorMesh.uuid,
            scene_uuid: scene.uuid
        });

        await idempotenceCreate(MeshMaterial, {
            submesh_name: 'Demo Floor',
            material_uuid: blackFabricMaterial.uuid,
            mesh_uuid: floorMesh.uuid
        });
    }

    const createCheckouts = async () => {
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
            scene_uuid: scene.uuid
        });
    }

    const createStaticObjects = async () => {
        await idempotenceCreate(MeshMaterial, {
            submesh_name: 'Demo Static Chair',
            material_uuid: blackFabricMaterial.uuid,
            mesh_uuid: chairMesh.uuid
        });
        await idempotenceCreate(SceneStaticObject, {
            name: 'Demo Static Object',
            mesh_uuid: chairMesh.uuid,
            scene_uuid: scene.uuid
        });
    }

    await createLights();
    await createFloors();
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
