import SDKFetchError from './errors/SDKFetchError.js';
import SDKFetchMissingTokenError from './errors/SDKFetchMissingTokenError.js';

const apiPath = '/api/';
let apiVersion = 'v1';
let authAPIVersion = 'v1';
let serverURL = 'http://localhost:5173';
let authServerURL = 'http://localhost:5172';
let tokenLocalStorageKey = 'auth';

function setServerURL(url) {
    serverURL = url;
}

function setAuthServerURL(url) {
    authServerURL = url;
}

function getAuthToken() {
    return localStorage.getItem(tokenLocalStorageKey);
}

function setAuthToken(token) {
    localStorage.setItem(tokenLocalStorageKey, token);
}

function setAuthTokenKey(key) {
    tokenLocalStorageKey = key;
}

function setAPIVersion(version) {
    apiVersion = version;
}

function setAuthAPIVersion(version) {
    authAPIVersion = version;
}

/**
 * @function fetchAPI
 * @description Fetches data from the API. It automatically add content-type 
 * header and stringifies the body if it exists.
 * @param {string} endpoint The endpoint to fetch (without the '/' at the beginning)
 * @param {object} options The fetch options
 * @param {boolean} useAuth Whether to use authentication or not
 * @param {number} refreshes The number of times the token has been refreshed in the same request
 * @returns {Promise<Response>} The fetch response
 * @throws {SDKFetchError} If the fetch fails
 */
async function request(endpoint, options, useAuth = false, refreshes = 0) {
    if (options && options.body) {
        options.body = JSON.stringify(options.body);

        if (!options.headers) options.headers = {};
        if (!options.headers['Content-Type']) {
            options.headers = {
                ...options.headers,
                'Content-Type': 'application/json'
            }
        }
    }

    if (useAuth) {
        const token = getAuthToken();
        if (token) {
            if (!options.headers) options.headers = {};
            if (!options.headers['Authorization']) {
                options.headers = {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`
                };
            }
        } else {
            throw new SDKFetchMissingTokenError('No token found, please call login() first');
        }
    }

    const response = await fetch(`${serverURL}${apiPath}${apiVersion}/${endpoint}`, options);
    
    if (!response.ok) {
        const { statusText, status } = response;

        const isUnauthorized = status === 401 || status === 403 || status === 419;
        if (isUnauthorized && refreshes < 1) {
            if (refreshMethod) {
                const response = await fetchAPI.request(`${authServerURL}${apiPath}${apiVersion}/auth`, {
                    method: 'PUT',
                    credentials: 'include'
                });

                const data = await response.json();
                setAuthToken(data.access_token);
            }

            return request(endpoint, options, useAuth, refreshes + 1);
        }

        throw new SDKFetchError(statusText, status);
    }

    return response;
}

export default {
    setServerURL,
    request,
    setAuthTokenKey,
    getAuthToken,
    setAPIVersion,
    setAuthServerURL,
    setAuthAPIVersion
}
