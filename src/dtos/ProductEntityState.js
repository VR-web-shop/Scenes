
export default function dto(entity) {
    if (!entity || typeof entity !== "object") {
        throw new Error("description is required and must be an object");
    }

    return {
        name: entity.name,
        created_at: entity.created_at,
        updated_at: entity.updated_at
    }
}
