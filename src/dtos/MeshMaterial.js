
export default function dto(entity) {
    if (!entity || typeof entity !== "object") {
        throw new Error("object is required and must be an object");
    }

    return {
        client_side_uuid: entity.client_side_uuid,
        submesh_name: entity.submesh_name,
        material_client_side_uuid: entity.material_client_side_uuid,
        mesh_client_side_uuid: entity.mesh_client_side_uuid,
        created_at: entity.created_at,
        updated_at: entity.created_at
    }
}
 