
export default function dto(entity) {
    if (!entity || typeof entity !== "object") {
        throw new Error("object is required and must be an object");
    }

    return {
        client_side_uuid: entity.client_side_uuid,
        name: entity.name,
        source: entity.rotation_client_side_uuid,
        texture_type_name: entity.position_client_side_uuid,
        created_at: entity.created_at,
        updated_at: entity.created_at
    }
}