import dto from '../dtos/Material.js';

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
    modelName: 'Material',

    /*
     * The table name is used to find the table in the database.
     * Required.
     */
    tableName: 'Materials',

    /**
     * The index name is used to find the model in the elasticsearch database.
     * Required.
     */
    indexName: 'Material',

    /*
     * The cas keys are used to determine if anything has changed in the material.
     * If the keys have not changed, the material is not updated.
     * Required.
     */
    casKeys: [
        'name', 
        'material_type_name'
    ],

    /*
     * The snapshot defines the model's snapshot model and foreign key.
     * If the attribute is null or undefined, the snapshot is not taken
     * into account.
     * Not required.
     */
    snapshot: { 
        modelName: 'MaterialDescriptions', 
        fkName: 'material_client_side_uuid' 
    },

    /*
     * The tombstone defines the model's tombstone model and foreign key.
     * If the attribute is null or undefined, the tombstone is not taken
     * into account.
     * Not required.
     */
    tombstone: { 
        modelName: 'MaterialRemoveds', 
        fkName: 'material_client_side_uuid' 
    },
}
