import 'dotenv/config';
import { Client } from '@elastic/elasticsearch';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // just for testing

const client = new Client({
    node: process.env.ELASTIC_NODE,
    auth: { apiKey: process.env.ELASTIC_API_KEY }
});

/**
 * @function insert
 * @description Insert data into the index.
 * @param {string} datasource The datasource.
 * @param {string} _index The index.
 * @param {function} onDocument The document function.
 * @returns {Promise} The promise.
 */
const insert = async (datasource, _index, onDocument = (doc) => ({ index: { _index } })) => {
    return await client.helpers.bulk({ datasource, onDocument, });
}

/**
 * @function put
 * @description put data in the index.
 * @param {string} index The index.
 * @param {string} id The id.
 * @param {object} doc The document.
 * @returns {Promise} The promise.
 */
const put = async (index, pkName, id, doc) => {
    for (const key in doc) {
        if (typeof doc[key] === 'boolean' ||
            doc[key] === 'true' ||
            doc[key] === 'false'
        ) {
            const bool = Boolean(doc[key]);
            doc[key] = bool ? 1 : 0;
        }
    }
    
    // Check if index exist
    const indexExists = await client.indices.exists({ index });
    
    // Check if document exist
    let documentExists = false;
    if (indexExists) {
        documentExists = await client.exists({ index, id });
    } else {
        // Create the index
        await client.indices.create({ index });
    }

    if (!documentExists) {
        // Create the document
        await client.index({ index, id, body: doc });
    } else {
        // Find the document
        const res = await client.get({ index, id });

        // Find the changed fields
        const changed = Object.keys(doc).filter(key => doc[key] !== res._source[key]);
        if (changed.length === 0) return;

        // Run a script only updating the changed fields
        // to avoid losing data
        const script = changed.map(key => `ctx._source.${key} = params.${key}`).join(';');
        await client.update({
            index,
            id,
            body: {
                script: { source: script, lang: "painless", params: doc }
            }
        });
    }
    // get the document
    const currentDoc = await client.get({ index, id });
    return currentDoc;
}

const putChild = async (index, id, relation, docKey, pkName, params) => {
    console.log(index, id, relation, docKey, pkName, params);
    await client.update({
        index,
        id,
        body: {
            script: {
                source: `
                    ${relation === "many"
                        ? 
                          `
                            if (ctx._source.${docKey} == null) {
                                ctx._source.${docKey} = [];
                            }
                          `
                        : 
                          `
                            if (ctx._source.${docKey} == null) {
                                ctx._source.${docKey} = null;
                            }
                          `
                    }

                    ${relation === "many"
                        ? 
                        `
                            for (int i = 0; i < ctx._source.${docKey}.length; i++) {
                                if (ctx._source.${docKey}[i].${pkName} == params.${pkName}) {
                                    ctx._source.${docKey}[i] = params;
                                    return;
                                }
                            }

                            ctx._source.${docKey}.add(params)
                        `
                        : 
                        `
                            ctx._source.${docKey} = params
                        `
                    }
                `,
                lang: "painless",
                params
            }
        }
    });
}

const putFromConfig = async (config, pkName, pk, doc) => {
    for (const conf of config) {
        const index = conf.indexName;
        
        
        if (conf.relation) {
            doc._entity_type = index;
            console.log(conf.idKey, { [pkName]: pk, ...doc });
            const id = { [pkName]: pk, ...doc }[conf.idKey];
            await putChild(index, id, conf.relation, conf.docKey, pkName, doc);
        } else {
            doc._entity_type = conf.docKey;
            await put(index, pkName, doc[conf.idKey], doc);
        }
    }
}

/**
 * @function remove
 * @description Remove data from the index.
 * @param {string} index The index.
 * @param {string} id The id.
 * @returns {Promise} The promise.
 */
const remove = async (index, id) => {
    return await client.delete({ index, id });
}

/**
 * @function search
 * @description Search for data in the index.
 * @param {string} index The index.
 * @param {string} q The query.
 * @returns {Promise} The promise.
 */
const search = async (query) => {
    return await client.search(query);
}

const invoke = async (query) => {
    return await query.execute(search);
}

export default {
    client,
    insert,
    put,
    putChild,
    putFromConfig,
    remove,
    search,
    invoke
};
