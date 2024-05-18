
export default function dto(entity) {
    if (!entity || typeof entity !== "object") {
        throw new Error("object is required and must be an object");
    }

    return {
        client_side_uuid: entity.client_side_uuid,
        x: entity.x,
        y: entity.y,
        z: entity.z,
        created_at: entity.created_at,
        updated_at: entity.created_at
    }
}
 