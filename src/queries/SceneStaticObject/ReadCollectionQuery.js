
import _ReadCollectionQuery from "../abstractions/ReadCollectionQuery.js";
import ModelDefinition from "../../modelDefinitions/SceneStaticObject.js";

export default class ReadCollectionQuery extends _ReadCollectionQuery {

    constructor(options={}) {
        super(
            ModelDefinition,
            options,
        );
    }
}
