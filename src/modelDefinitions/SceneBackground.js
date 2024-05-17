import dto from '../dtos/SceneBackground.js';

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
    modelName: 'SceneBackground',

    /*
     * The table name is used to find the table in the database.
     * Required.
     */
    tableName: 'SceneBackgrounds',

    /**
     * The index name is used to find the model in the elasticsearch database.
     * Required.
     */
    indexName: 'SceneBackground',

    /*
     * The cas keys are used to determine if anything has changed in the material.
     * If the keys have not changed, the material is not updated.
     * Required.
     */
    casKeys: [
        'hex', 
    ],

    /*
     * The snapshot defines the model's snapshot model and foreign key.
     * If the attribute is null or undefined, the snapshot is not taken
     * into account.
     * Not required.
     */
    snapshot: { 
        modelName: 'SceneBackgroundDescription', 
        tableName: 'SceneBackgroundDescriptions',
        fkName: 'scene_background_client_side_uuid' 
    },

    /*
     * The tombstone defines the model's tombstone model and foreign key.
     * If the attribute is null or undefined, the tombstone is not taken
     * into account.
     * Not required.
     */
    tombstone: { 
        modelName: 'SceneBackgroundRemoved', 
        tableName: 'SceneBackgroundRemoveds',
        fkName: 'scene_background_client_side_uuid' 
    },
}
