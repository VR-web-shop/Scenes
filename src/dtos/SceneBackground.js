
export default function dto(entity) {
    if (!entity || typeof entity !== "object") {
        throw new Error("object is required and must be an object");
    }

    return {
        client_side_uuid: entity.client_side_uuid,
        hex: entity.hex,
        scene_client_side_uuid: entity.scene_client_side_uuid,
        created_at: entity.created_at,
        updated_at: entity.created_at
    }
}
 