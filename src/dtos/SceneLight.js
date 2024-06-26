
export default function dto(entity) {
    if (!entity || typeof entity !== "object") {
        throw new Error("object is required and must be an object");
    }

    return {
        client_side_uuid: entity.client_side_uuid,
        name: entity.name,
        position_client_side_uuid: entity.position_client_side_uuid,
        rotation_client_side_uuid: entity.rotation_client_side_uuid,
        scene_light_type_name: entity.scene_light_type_name,
        intensity: entity.intensity,
        hex_color: entity.hex_color,
        scene_client_side_uuid: entity.scene_client_side_uuid,
        created_at: entity.created_at,
        updated_at: entity.created_at
    }
}