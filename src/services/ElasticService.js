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
const insert = async (datasource, _index, onDocument=(doc) => ({ index: { _index } })) => {
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
const put = async (index, id, doc) => {
    return await client.index({ index, id, body: doc });
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
    console.log('search', query);
    return await client.search(query);
}

const invoke = async (query) => {
    return await query.execute(search);
}

export default {
    client,
    insert,
    put,
    remove,
    search,
    invoke
};
