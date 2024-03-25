import { DataTypes, QueryTypes } from 'sequelize';
import Database from './Database.js';

const MeshMaterial = Database.define("MeshMaterial", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  submesh_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// The belongsToMany relationship adds unique constraints by default.
// I was unable to find a way to remove them using the Sequelize API.
// So I had to resort to raw SQL queries.
export async function removeConstraints() {
  try {
    const query = `
        ALTER TABLE mesh_materials
        DROP FOREIGN KEY mesh_materials_ibfk_1,
        DROP FOREIGN KEY mesh_materials_ibfk_2,
        DROP INDEX mesh_materials_mesh_uuid_material_uuid_unique;
      `;
    await Database.query(query, { type: QueryTypes.RAW });
    console.log('Constraints removed successfully.');
  } catch (error) {
    console.error('Error removing constraints:', error);
  }
}

export default MeshMaterial;
