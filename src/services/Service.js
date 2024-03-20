import CrudService from "./CrudService.js";

import Material from "../models/Material.js";
import MaterialTexture from "../models/MaterialTexture.js";
import MaterialType from "../models/MaterialType.js";
import Mesh from "../models/Mesh.js";
import MeshMaterial from "../models/MeshMaterial.js";
import Product from "../models/Product.js";
import ProductEntity from "../models/ProductEntity.js";
import ProductEntityState from "../models/ProductEntityState.js";
import Scene from "../models/Scene.js";
import SceneBackground from "../models/SceneBackground.js";
import SceneBasket from "../models/SceneBasket.js";
import SceneCamera from "../models/SceneCamera.js";
import SceneCheckout from "../models/SceneCheckout.js";
import SceneFloor from "../models/SceneFloor.js";
import SceneLight from "../models/SceneLight.js";
import SceneLightType from "../models/SceneLightType.js";
import SceneStaticObject from "../models/SceneStaticObject.js";
import Texture from "../models/Texture.js";
import TextureType from "../models/TextureType.js";
import Vector3D from "../models/Vector3D.js";

export default {
    MaterialService: new CrudService(Material, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: ['name', 'description', 'material_type_name'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['name', 'description', 'material_type_name'] },
        update: { properties: ['name', 'description', 'material_type_name'] },
        delete: true
    }),

    MaterialTextureService: new CrudService(MaterialTexture, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: ['texture_uuid', 'material_uuid'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['texture_uuid', 'material_uuid'] },
        update: { properties: ['texture_uuid', 'material_uuid'] },
        delete: true
    }),

    MaterialTypeService: new CrudService(MaterialType, 'name', {
        find: true,
        findAll: { 
            searchProperties: ['name'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['name'] },
        update: { properties: ['name'], requiredProperties: ['name'] },
        delete: true
    }),

    MeshService: new CrudService(Mesh, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: ['name', 'source'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['name', 'source'] },
        update: { properties: ['name', 'source'] },
        delete: true
    }),

    MeshMaterialService: new CrudService(MeshMaterial, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: ['submesh_name', 'mesh_uuid', 'material_uuid'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['submesh_name', 'mesh_uuid', 'material_uuid'] },
        update: { properties: ['submesh_name', 'mesh_uuid', 'material_uuid'] },
        delete: true
    }),

    ProductService: new CrudService(Product, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: ['name', 'description'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['name', 'description', 'position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid'] },
        update: { properties: ['name', 'description', 'position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid'] },
        delete: true
    }),

    ProductEntityService: new CrudService(ProductEntity, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: ['product_entity_state_name', 'product_uuid'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['uuid', 'product_entity_state_name', 'product_uuid'] },
        update: { properties: ['product_entity_state_name'] },
        delete: true
    }),

    ProductEntityStateService: new CrudService(ProductEntityState, 'name', {
        find: true,
        findAll: { 
            searchProperties: ['name'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['name'] },
        update: { properties: ['name'] },
        delete: true
    }),

    SceneService: new CrudService(Scene, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: ['name', 'description'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['name', 'description'] },
        update: { properties: ['name', 'description'] },
        delete: true
    }),

    SceneBackgroundService: new CrudService(SceneBackground, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: ['red', 'green', 'blue'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['red', 'green', 'blue', 'scene_uuid'] },
        update: { properties: ['red', 'green', 'blue', 'scene_uuid'] },
        delete: true
    }),

    SceneBasketService: new CrudService(SceneBasket, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid'] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid'] },
        delete: true
    }),

    SceneCameraService: new CrudService(SceneCamera, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: ['position_uuid', 'rotation_uuid', 'scene_uuid'], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: ['position_uuid', 'rotation_uuid', 'scene_uuid'] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scene_uuid'] },
        delete: true
    }),

    SceneCheckoutService: new CrudService(SceneCheckout, 'uuid', {
        find: true,
        findAll: { 
            searchProperties: [
                'position_uuid', 'rotation_uuid', 'scale_uuid', 'surface_offset_uuid', 'surface_size_uuid', 
                'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
            ], 
            defaultLimit: 10, 
            defaultPage: 1 
        },
        create: { properties: [
            'position_uuid', 'rotation_uuid', 'scale_uuid', 'surface_offset_uuid', 'surface_size_uuid', 
            'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
        ]},
        update: { properties: [
            'position_uuid', 'rotation_uuid', 'scale_uuid', 'surface_offset_uuid', 'surface_size_uuid', 
            'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
        ]},
        delete: true
    }),

    SceneFloorService: new CrudService(SceneFloor, 'uuid', {
        find: true,
        findAll: {
            searchProperties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid'],
            defaultLimit: 10,
            defaultPage: 1
        },
        create: {
            properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid']
        },
        update: {
            properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid']
        },
        delete: true
    }),

    SceneLightService: new CrudService(SceneLight, 'uuid', {
        find: true,
        findAll: {
            searchProperties: ['position_uuid', 'rotation_uuid', 'scene_light_type_name', 'scene_uuid'],
            defaultLimit: 10,
            defaultPage: 1
        },
        create: {
            properties: ['position_uuid', 'rotation_uuid', 'scene_light_type_name', 'scene_uuid']
        },
        update: {
            properties: ['position_uuid', 'rotation_uuid', 'scene_light_type_name', 'scene_uuid']
        },
        delete: true
    }),

    SceneLightTypeService: new CrudService(SceneLightType, 'name', {
        find: true,
        findAll: {
            searchProperties: ['name'],
            defaultLimit: 10,
            defaultPage: 1
        },
        create: {
            properties: ['name']
        },
        update: {
            properties: ['name']
        },
        delete: true
    }),

    SceneStaticObjectService: new CrudService(SceneStaticObject, 'uuid', {
        find: true,
        findAll: {
            searchProperties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid'],
            defaultLimit: 10,
            defaultPage: 1
        },
        create: {
            properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid']
        },
        update: {
            properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid']
        },
        delete: true
    }),

    TextureService: new CrudService(Texture, 'uuid', {
        find: true,
        findAll: {
            searchProperties: ['name', 'source', 'texture_type_name'],
            defaultLimit: 10,
            defaultPage: 1
        },
        create: {
            properties: ['name', 'source', 'texture_type_name']
        },
        update: {
            properties: ['name', 'source', 'texture_type_name']
        },
        delete: true
    }),

    TextureTypeService: new CrudService(TextureType, 'name', {
        find: true,
        findAll: {
            searchProperties: ['name'],
            defaultLimit: 10,
            defaultPage: 1
        },
        create: {
            properties: ['name']
        },
        update: {
            properties: ['name']
        },
        delete: true
    }),

    Vector3DService: new CrudService(Vector3D, 'uuid', {
        find: {
            dto: ['uuid', 'x', 'y', 'z']
        },
        findAll: {
            searchProperties: ['x', 'y', 'z'],
            defaultLimit: 10,
            defaultPage: 1,
            dto: ['uuid', 'x', 'y', 'z']
        },
        create: {
            properties: ['x', 'y', 'z'],
            dto: ['uuid', 'x', 'y', 'z']
        },
        update: {
            properties: ['x', 'y', 'z'],
            dto: ['uuid', 'x', 'y', 'z']
        },
        delete: true
    })
}
