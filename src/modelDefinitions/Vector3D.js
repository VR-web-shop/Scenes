import dto from '../dtos/Vector3D.js';

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
    modelName: 'Vector3D',

    /*
     * The table name is used to find the table in the database.
     * Required.
     */
    tableName: 'Vector3ds',

    /**
     * The elastic options is used to find the model in the elasticsearch database.
     * Required.
     */
    elastic: [
        {
            indexName: 'vector3d',
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
        'x',
        'y',
        'z',
    ],

    /*
     * The snapshot defines the model's snapshot model and foreign key.
     * If the attribute is null or undefined, the snapshot is not taken
     * into account.
     * Not required.
     */
    snapshot: { 
        modelName: 'Vector3DDescription', 
        tableName: 'Vector3dDescriptions',
        fkName: 'vector3d_client_side_uuid' 
    },

    /*
     * The tombstone defines the model's tombstone model and foreign key.
     * If the attribute is null or undefined, the tombstone is not taken
     * into account.
     * Not required.
     */
    tombstone: { 
        modelName: 'Vector3DRemoved', 
        tableName: 'Vector3dRemoveds',
        fkName: 'vector3d_client_side_uuid' 
    },
}
