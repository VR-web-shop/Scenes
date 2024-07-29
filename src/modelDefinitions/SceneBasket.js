import dto from '../dtos/SceneBasket.js';

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
    modelName: 'SceneBasket',

    /*
     * The table name is used to find the table in the database.
     * Required.
     */
    tableName: 'SceneBaskets',

    /**
     * The elastic options is used to find the model in the elasticsearch database.
     * Required.
     */
    elastic: [
        {
            indexName: 'scenebasket',
            idKey: 'client_side_uuid',
            delete: 'default'
        },
        {
            indexName: 'scene',
            idKey: 'scene_client_side_uuid',
            docKey: 'scene_basket',
            relation: 'one',
            delete: 'child_only'
        },
    ],

    /*
     * The cas keys are used to determine if anything has changed in the material.
     * If the keys have not changed, the material is not updated.
     * Required.
     */
    casKeys: [
        'position_client_side_uuid', 
        'rotation_client_side_uuid',
        'scale_client_side_uuid',
        'object_offset_client_side_uuid',
        'placeholder_offset_client_side_uuid',
        'pocket_offset_client_side_uuid',
        'insert_area_offset_client_side_uuid',
        'insert_area_size_client_side_uuid',
        'object_client_side_uuid',
        'placeholder_client_side_uuid',
        'pocket_client_side_uuid',
        'scene_basket_state_name',
        'scene_client_side_uuid',
        'scene_basket_client_side_uuid',
    ],

    /*
     * The snapshot defines the model's snapshot model and foreign key.
     * If the attribute is null or undefined, the snapshot is not taken
     * into account.
     * Not required.
     */
    snapshot: { 
        modelName: 'SceneBasketDescription', 
        tableName: 'SceneBasketDescriptions',
        fkName: 'scene_basket_client_side_uuid' 
    },

    /*
     * The tombstone defines the model's tombstone model and foreign key.
     * If the attribute is null or undefined, the tombstone is not taken
     * into account.
     * Not required.
     */
    tombstone: { 
        modelName: 'SceneBasketRemoved', 
        tableName: 'SceneBasketRemoveds',
        fkName: 'scene_basket_client_side_uuid' 
    },
}
