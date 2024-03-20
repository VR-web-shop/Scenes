import RestController from "../RestController.js";
import Service from "../../../services/Service.js";

const prefix = '/api/v1/';
const {
    MaterialService,
    MaterialTextureService,
    MaterialTypeService,
    MeshService,
    SceneBackgroundService,
    SceneBasketService,
    SceneCameraService,
    SceneCheckoutService,
    SceneService,
    SceneFloorService,
    SceneLightService,
    SceneLightTypeService,
    SceneStaticObjectService,
    ProductService,
    ProductEntityService,
    ProductEntityStateService,
    TextureService,
    TextureTypeService,
    Vector3DService
} = Service;

export default {
    MaterialController: RestController(`${prefix}materials`, 'uuid', MaterialService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['name', 'description', 'material_type_name'], middleware: [] },
        update: { properties: ['name', 'description', 'material_type_name'], middleware: [] },
        delete: { middleware: [] }
    }),

    MaterialTextureTypeController: RestController(`${prefix}material_texture_types`, 'name', MaterialTextureService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['texture_uuid', 'material_uuid'], middleware: [] },
        update: { properties: ['texture_uuid', 'material_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    MaterialTypeController: RestController(`${prefix}material_types`, 'name', MaterialTypeService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
    }),

    MeshController: RestController(`${prefix}meshes`, 'uuid', MeshService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['name', 'source'], middleware: [] },
        update: { properties: ['name', 'source'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneBackgroundController: RestController(`${prefix}scene_backgrounds`, 'uuid', SceneBackgroundService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['red', 'green', 'blue', 'scene_uuid'], middleware: [] },
        update: { properties: ['red', 'green', 'blue', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneBasketController: RestController(`${prefix}scene_baskets`, 'uuid', SceneBasketService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid'], middleware: [] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneCameraController: RestController(`${prefix}scene_cameras`, 'uuid', SceneCameraService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['position_uuid', 'rotation_uuid', 'scene_uuid'], middleware: [] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneCheckoutController: RestController(`${prefix}scene_checkouts`, 'uuid', SceneCheckoutService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: [
            'position_uuid', 'rotation_uuid', 'scale_uuid', 'surface_offset_uuid', 'surface_size_uuid', 
            'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
        ], middleware: [] },
        update: { properties: [
            'position_uuid', 'rotation_uuid', 'scale_uuid', 'surface_offset_uuid', 'surface_size_uuid', 
            'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
        ], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneController: RestController(`${prefix}scenes`, 'uuid', SceneService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['name', 'description'], middleware: [] },
        update: { properties: ['name', 'description'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneFloorController: RestController(`${prefix}scene_floors`, 'uuid', SceneFloorService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid'], middleware: [] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneLightController: RestController(`${prefix}scene_lights`, 'uuid', SceneLightService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['position_uuid', 'rotation_uuid', 'scene_light_type_name', 'scene_uuid'], middleware: [] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scene_light_type_name', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    SceneLightTypeController: RestController(`${prefix}scene_light_types`, 'name', SceneLightTypeService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
    }),

    SceneStaticObjectController: RestController(`${prefix}scene_static_objects`, 'uuid', SceneStaticObjectService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid'], middleware: [] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid'], middleware: [] },
        delete: { middleware: [] }
    }),

    ProductController: RestController(`${prefix}products`, 'uuid', ProductService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        update: {
            properties: ['name', 'description', 'position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid'], 
            middleware: []
        },
    }),

    ProductEntityController: RestController(`${prefix}product_entities`, 'uuid', ProductEntityService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
    }),

    ProductEntityStateController: RestController(`${prefix}product_entity_states`, 'uuid', ProductEntityStateService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
    }),

    Vector3DController: RestController(`${prefix}vector3ds`, 'uuid', Vector3DService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['x', 'y', 'z'], middleware: [] },
        update: { properties: ['x', 'y', 'z'], middleware: [] },
        delete: { middleware: [] }
    }),

    TextureController: RestController(`${prefix}textures`, 'uuid', TextureService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
        create: { properties: ['name', 'source', 'texture_type_name'], middleware: [] },
        update: { properties: ['name', 'source', 'texture_type_name'], middleware: [] },
        delete: { middleware: [] }
    }),

    TextureTypeController: RestController(`${prefix}texture_types`, 'name', TextureTypeService, {
        find: { middleware: [] },
        findAll: { middleware: [] },
    }),
}
