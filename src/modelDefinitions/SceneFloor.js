import dto from '../dtos/SceneFloor.js';

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
    modelName: 'SceneFloor',

    /*
     * The table name is used to find the table in the database.
     * Required.
     */
    tableName: 'SceneFloors',

    /**
     * The elastic options is used to find the model in the elasticsearch database.
     * Required.
     */
    elastic: [
        {
            indexName: 'scenefloor',
            idKey: 'client_side_uuid',
            delete: 'default'
        },
        {
            indexName: 'scene',
            idKey: 'scene_client_side_uuid',
            docKey: 'scene_floors',
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
        'scale_client_side_uuid',
        'mesh_client_side_uuid',
        'scene_client_side_uuid',
    ],

    /*
     * The snapshot defines the model's snapshot model and foreign key.
     * If the attribute is null or undefined, the snapshot is not taken
     * into account.
     * Not required.
     */
    snapshot: { 
        modelName: 'SceneFloorDescription', 
        tableName: 'SceneFloorDescriptions',
        fkName: 'scene_floor_client_side_uuid' 
    },

    /*
     * The tombstone defines the model's tombstone model and foreign key.
     * If the attribute is null or undefined, the tombstone is not taken
     * into account.
     * Not required.
     */
    tombstone: { 
        modelName: 'SceneFloorRemoved', 
        tableName: 'SceneFloorRemoveds',
        fkName: 'scene_floor_client_side_uuid' 
    },
}
