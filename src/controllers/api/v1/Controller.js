import meteor from "@vr-web-shop/meteor";

import Material from "../../../models/Material.js";
import MaterialTexture from "../../../models/MaterialTexture.js";
import MaterialType from "../../../models/MaterialType.js";
import Mesh from "../../../models/Mesh.js";
import MeshMaterial from "../../../models/MeshMaterial.js";
import Product from "../../../models/Product.js";
import ProductEntity from "../../../models/ProductEntity.js";
import ProductEntityState from "../../../models/ProductEntityState.js";
import Scene from "../../../models/Scene.js";
import SceneBackground from "../../../models/SceneBackground.js";
import SceneBasket from "../../../models/SceneBasket.js";
import SceneCamera from "../../../models/SceneCamera.js";
import SceneCheckout from "../../../models/SceneCheckout.js";
import SceneFloor from "../../../models/SceneFloor.js";
import SceneLight from "../../../models/SceneLight.js";
import SceneLightType from "../../../models/SceneLightType.js";
import SceneStaticObject from "../../../models/SceneStaticObject.js";
import SceneProduct from "../../../models/SceneProduct.js";
import Texture from "../../../models/Texture.js";
import TextureType from "../../../models/TextureType.js";
import Vector3D from "../../../models/Vector3D.js";

const prefix = '/api/v1/';
const RestController = meteor.RestController;

export default {
    MaterialController: RestController(`${prefix}materials`, 'uuid', Material, {
        find: { 
            middleware: [],
            includes: [
                { endpoint: 'textures', model: 'Texture' },
                { endpoint: 'material_types', model: 'MaterialType' }
            ]
        },
        findAll: { 
            middleware: [], 
            findProperties: ['name'],
            whereProperties: ['name'],
            includes: ['Texture', 'MaterialType']},
        create: { properties: ['name', 'material_type_name'], middleware: [] },
        update: { properties: ['name', 'material_type_name'], middleware: [] },
        delete: { middleware: [] }
    }),

    MaterialTextureController: RestController(`${prefix}material_textures`, 'uuid', MaterialTexture, {
        find: { middleware: [] },
        findAll: { 
            middleware: [],
            whereProperties: ['texture_uuid', 'material_uuid'],
        },
        create: { properties: ['texture_uuid', 'material_uuid'], middleware: [] },
        update: { properties: ['texture_uuid', 'material_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    MaterialTypeController: RestController(`${prefix}material_types`, 'name', MaterialType, {
        find: { middleware: [] },
        findAll: { middleware: [] },
    }),

    MeshController: RestController(`${prefix}meshes`, 'uuid', Mesh, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['name', 'source'], middleware: [] },
        update: { properties: ['name', 'source'], middleware: [] },
        delete: { middleware: [] }
    }),

    MeshMaterialController: RestController(`${prefix}mesh_materials`, 'uuid', MeshMaterial, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['mesh_uuid', 'material_uuid', 'submesh_name'], middleware: [] },
        update: { properties: ['mesh_uuid', 'material_uuid', 'submesh_name'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneBackgroundController: RestController(`${prefix}scene_backgrounds`, 'uuid', SceneBackground, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['hex', 'scene_uuid'], middleware: [] },
        update: { properties: ['hex', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneBasketController: RestController(`${prefix}scene_baskets`, 'uuid', SceneBasket, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid'], middleware: [] },
        update: { properties: ['object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneCameraController: RestController(`${prefix}scene_cameras`, 'uuid', SceneCamera, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['position_uuid', 'rotation_uuid', 'scene_uuid'], middleware: [] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneCheckoutController: RestController(`${prefix}scene_checkouts`, 'uuid', SceneCheckout, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: [
            'name', 'surface_offset_uuid', 'surface_size_uuid', 
            'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
        ], middleware: [] },
        update: { properties: [
            'name', 'surface_offset_uuid', 'surface_size_uuid', 
            'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
        ], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneProductController: RestController(`${prefix}scene_products`, 'uuid', SceneProduct, {
        find: { middleware: [] },
        findAll: { 
            middleware: [],
            whereProperties: ['scene_uuid', 'product_uuid', 'position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid'],
            includes: ['Position', 'Rotation', 'Scale', 'Mesh', 'Product', 'Scene']
        },
        create: { properties: ['mesh_uuid', 'product_uuid', 'scene_uuid'], middleware: [] },
        update: { properties: ['mesh_uuid', 'product_uuid', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneController: RestController(`${prefix}scenes`, 'uuid', Scene, {
        find: { 
            middleware: [],
            includes: [
                { endpoint: 'scene_backgrounds', model: 'SceneBackground' },
                { endpoint: 'scene_baskets', model: 'SceneBasket' },
                { endpoint: 'scene_cameras', model: 'SceneCamera' },
                { endpoint: 'scene_checkouts', model: 'SceneCheckouts' },
                { endpoint: 'scene_floors', model: 'SceneFloors' },
                { endpoint: 'scene_lights', model: 'SceneLights' },
                { endpoint: 'scene_static_objects', model: 'SceneStaticObjects' },
                { endpoint: 'scene_products', model: 'SceneProducts'}
            ] 
        },
        findAll: { 
            middleware: [],
            whereProperties: ['uuid'],
            includes: [
                'SceneBackground', 'SceneBasket', 'SceneCamera', 
                'SceneCheckout', 'SceneFloor', 'SceneLight', 
                'SceneStaticObject', 'SceneProduct'
            ]
        },
        create: { properties: ['name', 'description'], middleware: [] },
        update: { properties: ['name', 'description'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneFloorController: RestController(`${prefix}scene_floors`, 'uuid', SceneFloor, {
        find: { 
            middleware: []
        },
        findAll: { 
            middleware: [],
            searchProperties: ['scene_uuid'],
            whereProperties: ['scene_uuid'],
            includes: ['Position', 'Rotation', 'Scale', 'Mesh', 'Scene']  
        },
        create: { properties: ['name', 'mesh_uuid', 'scene_uuid'], middleware: [] },
        update: { properties: ['name', 'mesh_uuid', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneLightController: RestController(`${prefix}scene_lights`, 'uuid', SceneLight, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['name', 'intensity', 'hexColor', 'scene_light_type_name', 'scene_uuid'], middleware: [] },
        update: { properties: ['name', 'intensity', 'hexColor', 'scene_light_type_name', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneLightTypeController: RestController(`${prefix}scene_light_types`, 'name', SceneLightType, {
        find: { middleware: [] },
        findAll: { middleware: [] },
    }),

    SceneStaticObjectController: RestController(`${prefix}scene_static_objects`, 'uuid', SceneStaticObject, {
        find: { middleware: [] },
        findAll: { 
            middleware: [],
            whereProperties: ['scene_uuid'],
            includes: ['Position', 'Rotation', 'Scale', 'Mesh', 'Scene']
        },
        create: { properties: ['name', 'mesh_uuid', 'scene_uuid'], middleware: [] },
        update: { properties: ['name', 'mesh_uuid', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    ProductController: RestController(`${prefix}products`, 'uuid', Product, {
        find: { middleware: [] },
        findAll: { 
            middleware: [],
            whereProperties: ['name'],
            includes: ['ProductEntity', 'SceneProduct']
        },
        create: { properties: ['name', 'description'], middleware: [], serviceOnly: true  },
        update: {
            properties: ['name', 'description', 'position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid'], 
            middleware: []
        },
        delete: { middleware: [], serviceOnly: true }
    }),

    ProductEntityController: RestController(`${prefix}product_entities`, 'uuid', ProductEntity, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['product_uuid', 'product_entity_state_name'], middleware: [], serviceOnly: true },
        update: { properties: ['product_uuid', 'product_entity_state_name'], middleware: [], serviceOnly: true },
        delete: { middleware: [], serviceOnly: true }
    }),

    ProductEntityStateController: RestController(`${prefix}product_entity_states`, 'uuid', ProductEntityState, {
        find: { middleware: [] },
        findAll: { middleware: [] },
    }),

    Vector3DController: RestController(`${prefix}vector3ds`, 'uuid', Vector3D, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['x', 'y', 'z'], middleware: [] },
        update: { properties: ['x', 'y', 'z'], middleware: [] },
        delete: { middleware: [] }
    }),

    TextureController: RestController(`${prefix}textures`, 'uuid', Texture, {
        find: { 
            middleware: [],
            includes: [
                { endpoint: 'materials', model: 'Material' },
                { endpoint: 'texture_types', model: 'TextureType' }
            ]
        },
        findAll: { 
            middleware: [],
            includes: ['Material', 'TextureType']
        },
        create: { properties: ['name', 'source', 'texture_type_name'], middleware: [] },
        update: { properties: ['name', 'source', 'texture_type_name'], middleware: [] },
        delete: { middleware: [] }
    }),

    TextureTypeController: RestController(`${prefix}texture_types`, 'name', TextureType, {
        find: { middleware: [] },
        findAll: { middleware: [] },
    }),
}
