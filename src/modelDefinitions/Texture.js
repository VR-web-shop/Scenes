import dto from '../dtos/Texture.js';

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
    modelName: 'Texture',

    /*
     * The table name is used to find the table in the database.
     * Required.
     */
    tableName: 'Textures',

    /**
     * The index name is used to find the model in the elasticsearch database.
     * Required.
     */
    indexName: 'Texture',

    /*
     * The cas keys are used to determine if anything has changed in the material.
     * If the keys have not changed, the material is not updated.
     * Required.
     */
    casKeys: [
        'name',
        'source',
        'texture_type_name',
    ],

    /*
     * The snapshot defines the model's snapshot model and foreign key.
     * If the attribute is null or undefined, the snapshot is not taken
     * into account.
     * Not required.
     */
    snapshot: { 
        modelName: 'TextureDescription', 
        tableName: 'TextureDescriptions',
        fkName: 'scene_texture_client_side_uuid' 
    },

    /*
     * The tombstone defines the model's tombstone model and foreign key.
     * If the attribute is null or undefined, the tombstone is not taken
     * into account.
     * Not required.
     */
    tombstone: { 
        modelName: 'TextureRemoved', 
        tableName: 'TextureRemoveds',
        fkName: 'scene_texture_client_side_uuid' 
    },
}
