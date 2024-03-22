
    const CrudAPI = class CrudAPI {
    constructor(serverURL, endpoint, foreignKeyName = '', options = {}) {
        let _serverURL = serverURL;
        let _endpoint = endpoint;        
        let authorizationOptions = options.authorization || {};

        /**
         * @function setServerURL
         * @description Sets the server URL for the API.
         * @param {string} serverURL - The server URL.
         */
        this.setServerURL = function (serverURL) {
            _serverURL = serverURL;
        };

        /**
         * @function setEndpoint
         * @description Sets the endpoint for the API.
         * @param {string} endpoint - The endpoint.
         */
        this.setEndpoint = function (endpoint) {
            _endpoint = endpoint;
        };

        /**
         * @function buildRequestOptions
         * @description Builds the request options for the API.
         * @param {object} requestOptions - The request options.
         * @param {boolean} useAuth - Whether to use authorization.
         * @returns {object} The built request options.
         * @example const requestOptions = buildRequestOptions({ method: 'GET' }, true);
         */
        const buildRequestOptions = async function (requestOptions, useAuth = false) {

            if (useAuth) {
                if (authorizationOptions.storage === 'localStorage') {
                    const token = localStorage.getItem(authorizationOptions.key);
                    if (token) {
                        requestOptions.headers = {
                            ...requestOptions.headers,
                            'Authorization': `Bearer ${token}`
                        };
                    }
                } else if (authorizationOptions.storage === 'memory') {
                    requestOptions.headers = {
                        ...requestOptions.headers,
                        'Authorization': `Bearer ${authorizationOptions.token}`
                    };
                }
            }

            return requestOptions;
        };

        /**
         * @function setAuthorizationOptions
         * @description Sets the authorization options for the API.
         * @param {object} newOptions - The new authorization options.
         * @example setAuthorizationOptions({ storage: 'localStorage', key: 'auth' });
         * @example setAuthorizationOptions({ storage: 'memory', token: 'YOUR_TOKEN' });
         */
        this.setAuthorizationOptions = function (newOptions) {
            authorizationOptions = newOptions;
        };

        /**
         * @function getConstructorOptions
         * @description Gets the constructor options for the API.
         * @returns {object} The constructor options.
         */
        this.getConstructorOptions = function() {
            return {
                serverURL,
                endpoint,
                foreignKeyName,
                options
            };
        };

        const getUrl = function () {
            return `${_serverURL}${_endpoint}`;
        };

        if (options.find) {
            /**
             * @function find
             * @description Finds a record by the foreign key.
             * @param {object} params - The parameters to use for the find operation.
             * @param {object} methodOptions - The method options.
             * @returns {object} The found record.
             * @example const record = await find({ id: 1 });
             * @example const record = await find({ id: 1 }, { include: 'profile' });
             */
            this.find = async function (params, methodOptions = {}) {
                const key = params[foreignKeyName];
                if (!key) {
                    throw new Error(`No ${foreignKeyName} provided.`);
                }

                let currentEndpoint = `${getUrl()}/${key}`;
                if (methodOptions.include) {
                    currentEndpoint += `/${methodOptions.include}`;
                }

                const requestOptions = buildRequestOptions({ method: 'GET' }, options.find.auth);
                const response = await fetch(currentEndpoint, requestOptions);
                const data = await response.json();
                return data;
            };
        }

        if (options.findAll) {
            /**
             * @function findAll
             * @description Finds all records.
             * @param {object} params - The parameters to use for the find all operation.
             * @returns {object} The found records.
             * @example const records = await findAll({ limit: 10 });
             * @example const records = await findAll({ limit: 10, page: 1 });
             * @example const records = await findAll({ limit: 10, page: 1, q: 'search' });
             * @example const records = await findAll({ limit: 10, page: 1, q: 'search', include: 'profile' });
             */
            this.findAll = async function (params) {
                const { page, limit, q, include } = params;
                let _endpoint = `${getUrl()}?limit=${limit}`;
                if (page) _endpoint += `&page=${page}`;
                if (q) _endpoint += `&q=${q}`;
                if (include) _endpoint += `&include=${include}`;

                const requestOptions = buildRequestOptions({ method: 'GET' }, options.findAll.auth);
                const response = await fetch(_endpoint, requestOptions);
                const data = await response.json();
                return data;
            };
        }

        if (options.create) {
            /**
             * @function create
             * @description Creates a record.
             * @param {object} params - The parameters to use for the create operation.
             * @returns {object} The created record.
             * @example const record = await create({ name: 'John Doe', email: 'test@example.com' });
             */
            this.create = async function (params) {
                for (let key of options.create.properties) {
                    if (!params[key]) {
                        throw new Error(`No ${key} provided.`);
                    }
                }

                const requestOptions = buildRequestOptions({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: params
                }, options.create.auth);
                const response = await fetch(getUrl(), requestOptions);
                const data = await response.json();
                return data;
            };
        }

        if (options.update) {
            /**
             * @function update
             * @description Updates a record.
             * @param {object} params - The parameters to use for the update operation.
             * @returns {object} The updated record.
             * @example const record = await update({ id: 1, name: 'Jane Doe', email: 'test2@example.com' });
             */
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

                const requestOptions = buildRequestOptions({
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: params
                }, options.update.auth);
                const response = await fetch(getUrl(), requestOptions);
                const data = await response.json();
                return data;
            };
        }

        if (options.delete) {
            /**
             * @function destroy
             * @description Destroys a record.
             * @param {object} params - The parameters to use for the destroy operation.
             * @returns {boolean} Whether the record was destroyed.
             * @example const result = await destroy({ id: 1 });
             */
            this.destroy = async function (params) {
                const key = params[foreignKeyName];
                if (!key) {
                    throw new Error(`No ${foreignKeyName} provided.`);
                }

                const requestOptions = buildRequestOptions({
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: params
                }, options.delete.auth);
                const response = await fetch(getUrl(), requestOptions);
                return response.status === 204;
            };
        }
    }

    static buildOptions(options={}, auth=false) {
        const apiOptions = {};

        if (options.authorization) apiOptions.authorization = options.authorization;
        if (options.find) apiOptions.find = { auth };
        if (options.findAll) apiOptions.findAll = { auth };
        if (options.create) apiOptions.create = { auth, 
            properties: options.create.properties 
        };
        if (options.update) apiOptions.update = { auth, 
            properties: options.update.properties, 
            requiredProperties: options.update.requiredProperties 
        };
        if (options.delete) apiOptions.delete = { auth };
        
        return apiOptions;
    }

    static toJson(api) {
        const options = api.getConstructorOptions();
        return JSON.stringify(options);
    }

    static fromJson(json) {
        const parsed = JSON.parse(json);
        return new CrudAPI(parsed.serverURL, parsed.endpoint, parsed.foreignKeyName, parsed.options);
    }
}
    const apis = {
    "apis": [
        {
            "MaterialController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/materials\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"name\",\"description\",\"material_type_name\"]},\"update\":{\"auth\":false,\"properties\":[\"name\",\"description\",\"material_type_name\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "MaterialTextureController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/material_textures\",\"foreignKeyName\":\"name\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"texture_uuid\",\"material_uuid\"]},\"update\":{\"auth\":false,\"properties\":[\"texture_uuid\",\"material_uuid\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "MaterialTypeController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/material_types\",\"foreignKeyName\":\"name\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false}}}"
        },
        {
            "MeshController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/meshes\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"name\",\"source\"]},\"update\":{\"auth\":false,\"properties\":[\"name\",\"source\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "MeshMaterialController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/mesh_materials\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"mesh_uuid\",\"material_uuid\"]},\"update\":{\"auth\":false,\"properties\":[\"mesh_uuid\",\"material_uuid\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "SceneBackgroundController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/scene_backgrounds\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"red\",\"green\",\"blue\",\"scene_uuid\"]},\"update\":{\"auth\":false,\"properties\":[\"red\",\"green\",\"blue\",\"scene_uuid\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "SceneBasketController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/scene_baskets\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scale_uuid\",\"object_offset_uuid\",\"object_uuid\",\"placeholder_uuid\",\"scene_uuid\"]},\"update\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scale_uuid\",\"object_offset_uuid\",\"object_uuid\",\"placeholder_uuid\",\"scene_uuid\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "SceneCameraController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/scene_cameras\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scene_uuid\"]},\"update\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scene_uuid\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "SceneCheckoutController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/scene_checkouts\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scale_uuid\",\"surface_offset_uuid\",\"surface_size_uuid\",\"ui_offset_uuid\",\"ui_rotation_uuid\",\"mesh_uuid\",\"scene_uuid\"]},\"update\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scale_uuid\",\"surface_offset_uuid\",\"surface_size_uuid\",\"ui_offset_uuid\",\"ui_rotation_uuid\",\"mesh_uuid\",\"scene_uuid\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "SceneController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/scenes\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"name\",\"description\"]},\"update\":{\"auth\":false,\"properties\":[\"name\",\"description\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "SceneFloorController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/scene_floors\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scale_uuid\",\"mesh_uuid\",\"scene_uuid\"]},\"update\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scale_uuid\",\"mesh_uuid\",\"scene_uuid\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "SceneLightController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/scene_lights\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scene_light_type_name\",\"scene_uuid\"]},\"update\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scene_light_type_name\",\"scene_uuid\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "SceneLightTypeController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/scene_light_types\",\"foreignKeyName\":\"name\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false}}}"
        },
        {
            "SceneStaticObjectController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/scene_static_objects\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scale_uuid\",\"mesh_uuid\",\"scene_uuid\"]},\"update\":{\"auth\":false,\"properties\":[\"position_uuid\",\"rotation_uuid\",\"scale_uuid\",\"mesh_uuid\",\"scene_uuid\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "ProductController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/products\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"name\",\"description\"]},\"update\":{\"auth\":false,\"properties\":[\"name\",\"description\",\"position_uuid\",\"rotation_uuid\",\"scale_uuid\",\"mesh_uuid\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "ProductEntityController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/product_entities\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"product_uuid\",\"product_entity_state_name\"]},\"update\":{\"auth\":false,\"properties\":[\"product_uuid\",\"product_entity_state_name\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "ProductEntityStateController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/product_entity_states\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false}}}"
        },
        {
            "Vector3DController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/vector3ds\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"x\",\"y\",\"z\"]},\"update\":{\"auth\":false,\"properties\":[\"x\",\"y\",\"z\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "TextureController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/textures\",\"foreignKeyName\":\"uuid\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false},\"create\":{\"auth\":false,\"properties\":[\"name\",\"source\",\"texture_type_name\"]},\"update\":{\"auth\":false,\"properties\":[\"name\",\"source\",\"texture_type_name\"]},\"delete\":{\"auth\":false}}}"
        },
        {
            "TextureTypeController": "{\"serverURL\":\"http://http://localhost:3003\",\"endpoint\":\"/api/v1/texture_types\",\"foreignKeyName\":\"name\",\"options\":{\"find\":{\"auth\":false},\"findAll\":{\"auth\":false}}}"
        }
    ]
}
    const SDK = function(serverURL) {    
        if (!serverURL) {
            throw new Error('serverURL is required');
        }
        
        const api = {};
        const controllers = apis.apis;
        
        for (let object of apis.apis) {
            const key = Object.keys(object)[0];
            const apiInstance = CrudAPI.fromJson(object[key]);
            apiInstance.setServerURL(serverURL);
            api[key] = apiInstance;
        }

        return { api }
    }

    export default SDK
    