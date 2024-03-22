import meteor from '@vr-web-shop/meteor';
import json from './api.json';

/**
 * @function SDK
 * @description The SDK constructor
 * @param {string} serverURL The server URL
 * @returns {object} The SDK object
 * @throws {Error} If serverURL is not provided
 */
const SDK = function(serverURL) {
    if (!serverURL) {
        throw new Error('serverURL is required');
    }

    this.apis = [];
    for (let row of json) {
        const key = Object.keys(row)[0];
        const api = row[key];
        const data = meteor.CrudAPI.fromJson(api);
        data.serverURL = serverURL;
        this.apis.push(data);
    }
}

export default SDK
