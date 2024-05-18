
export default function dto(entity) {
    if (!entity || typeof entity !== "object") {
        throw new Error("description is required and must be an object");
    }

    return {
        client_side_uuid: entity.client_side_uuid,
        product_entity_state_name: entity.product_entity_state_name,
        product_client_side_uuid: entity.product_client_side_uuid,
        transaction_state_name: entity.distributed_transaction_state_name,
        transaction_message: entity.transaction_message,
        created_at: entity.created_at,
        updated_at: entity.updated_at
    }
}
