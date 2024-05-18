import _PutCommand from "../abstractions/PutCommand.js";
import ReadCollectionQuery from "../../queries/Scene/ReadCollectionQuery.js";
import ModelDefinition from "../../modelDefinitions/Scene.js";

export default class PutCommand extends _PutCommand {
    constructor(client_side_uuid, params) {
        super(
            ModelDefinition,
            client_side_uuid, 
            params, 
        );
    }

    async execute(db, options={}) {
        return super.execute(db, {
            afterTransactions: [
                async (transaction, entity, snapshot) => {
                    const readAndDisable = async (page=1) => {
                        const { rows, pages } = await new ReadCollectionQuery({}).execute(db);
                        for (const row of rows) {
                            if (row.client_side_uuid === entity.client_side_uuid) {
                                continue;
                            }

                            await new PutCommand(row.client_side_uuid, {
                                name: row.name,
                                description: row.description,
                                active: false,
                            }).execute(db, { transaction });
                        }

                        if (page < pages) {
                            await readAndDisable(page + 1);
                        }
                    }

                    if (snapshot.active) {
                        await readAndDisable();
                    }
                }
            ],
        });


    }
}
