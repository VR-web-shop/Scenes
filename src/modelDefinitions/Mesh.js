import dto from '../dtos/Mesh.js';

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
    modelName: 'Mesh',

    /*
     * The table name is used to find the table in the database.
     * Required.
     */
    tableName: 'Meshes',

    /**
     * The elastic options is used to find the model in the elasticsearch database.
     * Required.
     */
    elastic: [
        {
            indexName: 'mesh',
            idKey: 'client_side_uuid',
            delete: 'default'
        },
    ],

    /*
     * The cas keys are used to determine if anything has changed in the material.
     * If the keys have not changed, the material is not updated.
     * Required.
     */
    casKeys: [
        'name', 
        'source'
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
