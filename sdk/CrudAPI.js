import fetchAPI from './fetchAPI.js'

/**
 * Options:
 * - find: boolean
 * - findAll: { searchProperties: string[] }
 * - create: { properties: string[] }
 * - update: { properties: string[], requiredProperties: string[] }
 * - destroy: boolean
 */
export default class CrudAPI {
    constructor(endpoint, foreignKeyName = '', options = {}) {
        if (options.find) {
            this.find = async function (params, methodOptions = {}) {
                const key = params[foreignKeyName];
                if (!key) {
                    throw new Error(`No ${foreignKeyName} provided.`);
                }

                let currentEndpoint = `${endpoint}/${key}`;
                if (methodOptions.include) {
                    currentEndpoint += `/${methodOptions.include}`;
                }
                
                const response = await fetchAPI.request(currentEndpoint, { method: 'GET' }, true);
                const data = await response.json();
                return data;
            };
        }

        if (options.findAll) {
            this.findAll = async function (params) {
                const { page, limit, q, include } = params;
                let _endpoint = `${endpoint}?limit=${limit}`;
                if (page) _endpoint += `&page=${page}`;
                if (q) _endpoint += `&q=${q}`;
                if (include) _endpoint += `&include=${include}`;
                const response = await fetchAPI.request(_endpoint, { method: 'GET' }, true);
                const data = await response.json();
                return data;
            };
        }

        if (options.create) {
            this.create = async function (params) {
                for (let key of options.create.properties) {
                    if (!params[key]) {
                        throw new Error(`No ${key} provided.`);
                    }
                }

                const response = await fetchAPI.request(endpoint, {
                    method: 'POST',
                    body: params
                }, true);
                const data = await response.json();
                return data;
            };
        }

        if (options.update) {
            this.update = async function (params) {
                if (options.update.requiredProperties) {
                    for (let key of options.update.requiredProperties) {
                        if (!params[key]) {
                            throw new Error(`No ${key} provided.`);
                        }
                    }
                }

                const key = params[foreignKeyName];
                if (!key) {
                    throw new Error(`No ${foreignKeyName} provided.`);
                }

                const response = await fetchAPI.request(endpoint, {
                    method: 'PUT',
                    body: params
                }, true);
                const data = await response.json();
                return data;
            };
        }

        if (options.delete) {
            this.destroy = async function (params) {
                const key = params[foreignKeyName];
                if (!key) {
                    throw new Error(`No ${foreignKeyName} provided.`);
                }

                const response = await fetchAPI.request(endpoint, {
                    method: 'DELETE',
                    body: params
                }, true);
                return response.status === 204;
            };
        }
    }
}
