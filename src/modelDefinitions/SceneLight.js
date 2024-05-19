import dto from '../dtos/SceneLight.js';

export default {
    /**
     * The DTO is used to avoid leaking sensitive information.
     * Required.
     */
    dto,

    /**
     * The primary key is used to find the model in the database.
     * Required.
     */
    pkName: 'client_side_uuid',
    
    /**
     * The model name is used to find Sequelize models in the db/models directory.
     * Required.
     */
    modelName: 'SceneLight',

    /*
     * The table name is used to find the table in the database.
     * Required.
     */
    tableName: 'SceneLights',

    /**
     * The elastic options is used to find the model in the elasticsearch database.
     * Required.
     */
    elastic: [
        {
            indexName: 'scenelight',
            idKey: 'client_side_uuid',
            delete: 'default'
        },
        {
            indexName: 'scene',
            idKey: 'scene_client_side_uuid',
            docKey: 'scene_lights',
            relation: 'many',
            delete: 'child_only'
        },
    ],

    /*
     * The cas keys are used to determine if anything has changed in the material.
     * If the keys have not changed, the material is not updated.
     * Required.
     */
    casKeys: [
        'name', 
        'position_client_side_uuid',
        'rotation_client_side_uuid',
        'scene_light_type_name',
        'intensity',
        'hexColor',
        'scene_client_side_uuid',
    ],

    /*
     * The snapshot defines the model's snapshot model and foreign key.
     * If the attribute is null or undefined, the snapshot is not taken
     * into account.
     * Not required.
     */
    snapshot: { 
        modelName: 'SceneLightDescription', 
        tableName: 'SceneLightDescriptions',
        fkName: 'scene_light_client_side_uuid' 
    },

    /*
     * The tombstone defines the model's tombstone model and foreign key.
     * If the attribute is null or undefined, the tombstone is not taken
     * into account.
     * Not required.
     */
    tombstone: { 
        modelName: 'SceneLightRemoved', 
        tableName: 'SceneLightRemoveds',
        fkName: 'scene_light_client_side_uuid' 
    },
}
