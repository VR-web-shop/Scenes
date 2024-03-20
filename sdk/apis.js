import CrudAPI from './CrudAPI.js';

export default {
    products: new CrudAPI('products', 'uuid', {
        find: true,
        findAll: true,
        update: { properties: [ 'name', 'description', 'position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid' ]},
    }),

    productEntities: new CrudAPI('product_entities', 'uuid', {
        find: true,
        findAll: true,
    }),

    productEntityStates: new CrudAPI('product_entity_states', 'name', {
        find: true,
        findAll: true,
    }),

    vector3ds: new CrudAPI('vector3ds', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: [ 'x', 'y', 'z' ]},
        update: { properties: [ 'x', 'y', 'z' ]},
        delete: true
    }),

    sceneFloors: new CrudAPI('scene_floors', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid'] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid'] },
        delete: true
    }),

    sceneLights: new CrudAPI('scene_lights', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['position_uuid', 'rotation_uuid', 'scene_light_type_name', 'scene_uuid'] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scene_light_type_name', 'scene_uuid'] },
        delete: true
    }),

    sceneLightTypes: new CrudAPI('scene_light_types', 'name', {
        find: true,
        findAll: true,
    }),

    sceneStaticObjects: new CrudAPI('scene_static_objects', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid'] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'mesh_uuid', 'scene_uuid'] },
        delete: true
    }),

    sceneCameras: new CrudAPI('scene_cameras', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['position_uuid', 'rotation_uuid', 'scene_uuid'] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scene_uuid'] },
        delete: true
    }),

    sceneBackgrounds: new CrudAPI('scene_backgrounds', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['red', 'green', 'blue', 'scene_uuid'] },
        update: { properties: ['red', 'green', 'blue', 'scene_uuid'] },
        delete: true
    }),

    sceneCheckouts: new CrudAPI('scene_checkouts', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: [
            'position_uuid', 'rotation_uuid', 'scale_uuid', 'surface_offset_uuid', 'surface_size_uuid', 
            'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
        ] },
        update: { properties: [
            'position_uuid', 'rotation_uuid', 'scale_uuid', 'surface_offset_uuid', 'surface_size_uuid', 
            'ui_offset_uuid', 'ui_rotation_uuid', 'mesh_uuid', 'scene_uuid'
        ] },
        delete: true
    }),

    sceneBasket: new CrudAPI('scene_baskets', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid'] },
        update: { properties: ['position_uuid', 'rotation_uuid', 'scale_uuid', 'object_offset_uuid', 'object_uuid', 'placeholder_uuid', 'scene_uuid'] },
        delete: true
    }),

    scenes: new CrudAPI('scenes', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['name', 'description'] },
        update: { properties: ['name', 'description'] },
        delete: true
    }),

    materials: new CrudAPI('materials', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['name', 'description', 'material_type_name'] },
        update: { properties: ['name', 'description', 'material_type_name'] },
        delete: true
    }),

    materialTextures: new CrudAPI('material_textures', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['texture_uuid', 'material_uuid'] },
        update: { properties: ['texture_uuid', 'material_uuid'] },
        delete: true
    }),

    materialTypes: new CrudAPI('material_types', 'name', {
        find: true,
        findAll: true,
    }),

    meshes: new CrudAPI('meshes', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['name', 'source'] },
        update: { properties: ['name', 'source'] },
        delete: true
    }),

    textures: new CrudAPI('textures', 'uuid', {
        find: true,
        findAll: true,
        create: { properties: ['name', 'source'] },
        update: { properties: ['name', 'source'] },
        delete: true
    }),

    textureTypes: new CrudAPI('texture_types', 'name', {
        find: true,
        findAll: true,
    }),
}
