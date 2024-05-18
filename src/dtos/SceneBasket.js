
export default function dto(entity) {
    if (!entity || typeof entity !== "object") {
        throw new Error("object is required and must be an object");
    }

    return {
        client_side_uuid: entity.client_side_uuid,
        position_client_side_uuid: entity.position_client_side_uuid,
        rotation_client_side_uuid: entity.rotation_client_side_uuid,
        scale_client_side_uuid: entity.scale_client_side_uuid,
        object_offset_client_side_uuid: entity.object_offset_client_side_uuid,
        placeholder_offset_client_side_uuid: entity.placeholder_offset_client_side_uuid,
        pocket_offset_client_side_uuid: entity.pocket_offset_client_side_uuid,
        insert_area_offset_client_side_uuid: entity.insert_area_offset_client_side_uuid,
        insert_area_size_client_side_uuid: entity.insert_area_size_client_side_uuid,
        object_client_side_uuid: entity.object_client_side_uuid,
        placeholder_client_side_uuid: entity.placeholder_client_side_uuid,
        pocket_client_side_uuid: entity.pocket_client_side_uuid,
        basket_state_name: entity.basket_state_name,
        scene_client_side_uuid: entity.scene_client_side_uuid,
        created_at: entity.created_at,
        updated_at: entity.created_at
    }
}