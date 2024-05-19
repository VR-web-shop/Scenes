
export default function dto(entity) {
    if (!entity || typeof entity !== "object") {
        throw new Error("object is required and must be an object");
    }

    return {
        client_side_uuid: entity.client_side_uuid,
        position_client_side_uuid: entity.position_client_side_uuid,
        rotation_client_side_uuid: entity.rotation_client_side_uuid,
        scale_client_side_uuid: entity.scale_client_side_uuid,
        ui_offset_position_client_side_uuid: entity.ui_offset_position_client_side_uuid,
        ui_offset_rotation_client_side_uuid: entity.ui_offset_rotation_client_side_uuid,
        ui_scale_client_side_uuid: entity.ui_scale_client_side_uuid,
        product_client_side_uuid: entity.product_client_side_uuid,
        mesh_client_side_uuid: entity.mesh_client_side_uuid,
        scene_client_side_uuid: entity.scene_client_side_uuid,
        created_at: entity.created_at,
        updated_at: entity.created_at
    }
}