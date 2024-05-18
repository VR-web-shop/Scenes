import dto from '../dtos/MeshMaterial.js';

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
    modelName: 'MeshMaterial',

    /*
     * The table name is used to find the table in the database.
     * Required.
     */
    tableName: 'MeshMaterials',

    /**
     * The index name is used to find the model in the elasticsearch database.
     * Required.
     */
    indexName: 'meshmaterial',

    /*
     * The cas keys are used to determine if anything has changed in the material.
     * If the keys have not changed, the material is not updated.
     * Required.
     */
    casKeys: [
        'submesh_name', 
        'material_client_side_uuid'
    ],

    /*
     * The snapshot defines the model's snapshot model and foreign key.
     * If the attribute is null or undefined, the snapshot is not taken
     * into account.
     * Not required.
     */
    snapshot: { 
        modelName: 'MeshDescription', 
        tableName: 'MeshDescriptions',
        fkName: 'mesh_client_side_uuid' 
    },

    /*
     * The tombstone defines the model's tombstone model and foreign key.
     * If the attribute is null or undefined, the tombstone is not taken
     * into account.
     * Not required.
     */
    tombstone: { 
        modelName: 'MeshRemoved', 
        tableName: 'MeshRemoveds',
        fkName: 'mesh_client_side_uuid' 
    },
}
