import { Client } from '@elastic/elasticsearch';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // just for testing

const node = process.env.ELASTIC_NODE;
const apiKey = process.env.ELASTIC_API_KEY;
const client = new Client({ node, auth: { apiKey } });

export default client;