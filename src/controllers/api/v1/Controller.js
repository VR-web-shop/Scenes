import meteor from "@vr-web-shop/meteor";
import MiddlewareJWT from "../../../jwt/MiddlewareJWT.js";

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
import SceneCharacter from "../../../models/SceneCharacter.js";
import Texture from "../../../models/Texture.js";
import TextureType from "../../../models/TextureType.js";
import Vector3D from "../../../models/Vector3D.js";

const prefix = '/api/v1/';
const RestController = meteor.RestController;
const debug = false;

export default {
    MaterialController: RestController(`${prefix}materials`, 'uuid', Material, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            includes: [
                { endpoint: 'textures', model: 'Texture' },
                { endpoint: 'material_types', model: 'MaterialType' }
            ]
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT], 
            findProperties: ['name'],
            whereProperties: ['name'],
            includes: ['Texture', 'MaterialType']
        },
        create: { 
            properties: ['name', 'material_type_name'], 
            middleware: [MiddlewareJWT.AuthorizeJWT]
        },
        update: { 
            properties: ['name', 'material_type_name'], 
            middleware: [MiddlewareJWT.AuthorizeJWT]
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT]
        },
        debug
    }),

    MaterialTextureController: RestController(`${prefix}material_textures`, 'uuid', MaterialTexture, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['texture_uuid', 'material_uuid'],
        },
        create: { 
            properties: ['texture_uuid', 'material_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['texture_uuid', 'material_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    MaterialTypeController: RestController(`${prefix}material_types`, 'name', MaterialType, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    MeshController: RestController(`${prefix}meshes`, 'uuid', Mesh, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [],
            whereProperties: ['uuid', 'name'],
        },
        create: { 
            properties: ['name', 'source'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['name', 'source'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    MeshMaterialController: RestController(`${prefix}mesh_materials`, 'uuid', MeshMaterial, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['mesh_uuid', 'material_uuid', 'submesh_name'], 
        },
        create: { 
            properties: ['mesh_uuid', 'material_uuid', 'submesh_name'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['mesh_uuid', 'material_uuid', 'submesh_name'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    SceneBackgroundController: RestController(`${prefix}scene_backgrounds`, 'uuid', SceneBackground, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['uuid', 'scene_uuid'],
        },
        create: { 
            properties: ['hex', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['hex', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    SceneCharacterController: RestController(`${prefix}scene_characters`, 'uuid', SceneCharacter, {
        find: {
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: {
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['uuid', 'scene_uuid'],
        },
        debug
    }),

    SceneBasketController: RestController(`${prefix}scene_baskets`, 'uuid', SceneBasket, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['uuid', 'scene_uuid', 'state_name'],
        },
        create: { 
            properties: ['object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid', 'insert_area_offset_uuid', 'insert_area_size_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid', 'insert_area_offset_uuid', 'insert_area_size_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    SceneCameraController: RestController(`${prefix}scene_cameras`, 'uuid', SceneCamera, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['uuid', 'scene_uuid'],
        },
        create: { 
            properties: ['position_uuid', 'rotation_uuid', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['position_uuid', 'rotation_uuid', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT], 
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    SceneCheckoutController: RestController(`${prefix}scene_checkouts`, 'uuid', SceneCheckout, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['uuid', 'scene_uuid'],
        },
        create: { 
            properties: [
            'name', 'surface_offset_uuid', 'surface_size_uuid', 
            'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
            ], 
            middleware: [MiddlewareJWT.AuthorizeJWT], 
        },
        update: { 
            properties: [
            'name', 'surface_offset_uuid', 'surface_size_uuid', 
            'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
            ], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    SceneProductController: RestController(`${prefix}scene_products`, 'uuid', SceneProduct, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['uuid', 'state_name', 'scene_uuid', 'product_uuid', 'position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid'],
            includes: ['Position', 'Rotation', 'Scale', 'Mesh', 'Product', 'Scene']
        },
        create: { 
            properties: ['state_name', 'mesh_uuid', 'product_uuid', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['state_name', 'mesh_uuid', 'product_uuid', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    SceneController: RestController(`${prefix}scenes`, 'uuid', Scene, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
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
            whereProperties: ['uuid', 'active'],
            includes: [
                'SceneBackground', 'SceneBasket', 'SceneCamera', 
                'SceneCheckout', 'SceneFloor', 'SceneLight', 
                'SceneStaticObject', 'SceneProduct'
            ]
        },
        create: { 
            properties: ['name', 'description', 'active'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['name', 'description', 'active'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    SceneFloorController: RestController(`${prefix}scene_floors`, 'uuid', SceneFloor, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            searchProperties: ['scene_uuid'],
            whereProperties: ['uuid', 'scene_uuid'],
            includes: ['Position', 'Rotation', 'Scale', 'Mesh', 'Scene']  
        },
        create: { 
            properties: ['name', 'mesh_uuid', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['name', 'mesh_uuid', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    SceneLightController: RestController(`${prefix}scene_lights`, 'uuid', SceneLight, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['uuid', 'scene_uuid'],
        },
        create: { 
            properties: ['name', 'intensity', 'hexColor', 'scene_light_type_name', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['name', 'intensity', 'hexColor', 'scene_light_type_name', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    SceneLightTypeController: RestController(`${prefix}scene_light_types`, 'name', SceneLightType, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT], 
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    SceneStaticObjectController: RestController(`${prefix}scene_static_objects`, 'uuid', SceneStaticObject, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['uuid', 'scene_uuid'],
            includes: ['Position', 'Rotation', 'Scale', 'Mesh', 'Scene']
        },
        create: { 
            properties: ['name', 'mesh_uuid', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['name', 'mesh_uuid', 'scene_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    ProductController: RestController(`${prefix}products`, 'uuid', Product, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            whereProperties: ['name'],
            includes: ['ProductEntity', 'SceneProduct']
        },
        create: { 
            properties: ['name', 'description'], 
            middleware: [],
            serviceOnly: true  
        },
        update: {
            properties: ['name', 'description', 'position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [],
            serviceOnly: true 
        },
        debug
    }),

    ProductEntityController: RestController(`${prefix}product_entities`, 'uuid', ProductEntity, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [],
            whereProperties: ['uuid', 'product_uuid', 'product_entity_state_name'],
            includes: ['Product', 'ProductEntityState']
        },
        create: { 
            properties: ['product_uuid', 'product_entity_state_name'], 
            middleware: [],
            serviceOnly: true 
        },
        update: { 
            properties: ['product_uuid', 'product_entity_state_name'], 
            middleware: [],
            serviceOnly: true 
        },
        delete: { 
            middleware: [], 
            serviceOnly: true 
        }
    }),

    ProductEntityStateController: RestController(`${prefix}product_entity_states`, 'uuid', ProductEntityState, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    Vector3DController: RestController(`${prefix}vector3ds`, 'uuid', Vector3D, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        create: { 
            properties: ['x', 'y', 'z'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: {
            properties: ['x', 'y', 'z'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    TextureController: RestController(`${prefix}textures`, 'uuid', Texture, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            includes: [
                { endpoint: 'materials', model: 'Material' },
                { endpoint: 'texture_types', model: 'TextureType' }
            ]
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
            includes: ['Material', 'TextureType']
        },
        create: { 
            properties: ['name', 'source', 'texture_type_name'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        update: { 
            properties: ['name', 'source', 'texture_type_name'], 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        delete: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),

    TextureTypeController: RestController(`${prefix}texture_types`, 'name', TextureType, {
        find: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        findAll: { 
            middleware: [MiddlewareJWT.AuthorizeJWT],
        },
        debug
    }),
}
