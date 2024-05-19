
export default function dto(entity) {
    if (!entity || typeof entity !== "object") {
        throw new Error("object is required and must be an object");
    }

    return {
        client_side_uuid: entity.client_side_uuid,
        name: entity.name,
        active: entity.active,
        scene_background: entity.scene_background,
        scene_basket: entity.scene_basket,
        scene_camera: entity.scene_camera,
        scene_character: entity.scene_character,
        scene_checkouts: entity.scene_checkouts,
        scene_lights: entity.scene_lights,
        scene_products: entity.scene_products,
        scene_static_objects: entity.scene_static_objects,
        created_at: entity.created_at,
        updated_at: entity.created_at
    }
}
 