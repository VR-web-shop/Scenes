import ApiRequestError from './ApiRequestError.js';

/**
 * Options:
 * - find: {boolean}
 * - findAll: { searchProperties: string[] }
 * - create: { properties: string[] }
 * - update: { properties: string[], requiredProperties: string[] }
 * - destroy: {boolean}
 */
export default class CrudService {
    constructor(Model, foreignKeyName = '', options = {}) {
        if (options.find) {
            this.find = async function (params, methodOptions={}) {
                const pk = params[foreignKeyName];
                if (!pk) {
                    throw new ApiRequestError(`No ${foreignKeyName} provided.`, 400);
                }

                let includeModel;
                if (methodOptions.include) {
                    includeModel = methodOptions.include;

                    const associations = Object.values(Model.associations);
                    if (!associations.find(a => a.as === includeModel)) {
                        throw new ApiRequestError(`No association found with name ${includeModel}. Possible associations are: ${associations.map(a => a.as).join(', ')};`, 400);
                    }
                }

                const result = includeModel 
                    ? await Model.findOne({ where: { [foreignKeyName]: pk }, include: includeModel })
                    : await Model.findByPk(pk);


                if (options.find.dto) {
                    return CrudService.arrayToDto(options.find.dto, result);
                }

                return result;
            };
        }

        if (options.findAll) {
            this.findAll = async function (params, methodOptions={}) {
                const q = params.q;
                if (q) {
                    return await Model.findAll({
                        where: {
                            $or: options.findAll.searchProperties.map(prop => ({ [prop]: { like: '%' + q + '%' } }))
                        }
                    });
                }

                let includeModel;
                if (methodOptions.include) {
                    includeModel = methodOptions.include;

                    const associations = Object.values(Model.associations);
                    if (!associations.find(a => a.as === includeModel)) {
                        throw new ApiRequestError(`No association found with name ${includeModel}. Possible associations are: ${associations.map(a => a.as).join(', ')};`, 400);
                    }
                }

                const limit = parseInt(params.limit) || options.findAll.defaultLimit || 10;
                const page = parseInt(params.page) || options.findAll.defaultPage || 1;
                
                const offset = (page - 1) * limit;
                const count = await Model.count();
                const pages = Math.ceil(count / limit);

                const rows = includeModel
                    ? await Model.findAll({ include: includeModel, limit, offset })
                    : await Model.findAll({ limit, offset })

                const result = { count, pages, rows: rows.map(r=>r.dataValues) };
                
                if (options.findAll.dto) {
                    return {count, pages, rows: rows.map(r=>CrudService.arrayToDto(options.findAll.dto, r))};
                }

                return result;
            };
        }

        if (options.create) {
            this.create = async function (params) {
                for (let key of options.create.properties) {
                    if (!params[key]) {
                        throw new ApiRequestError(`No ${key} provided.`, 400);
                    }
                }

                const properties = options.create.properties.reduce((acc, key) => {
                    acc[key] = params[key];
                    return acc;
                }, {});

                const result = await Model.create(properties);

                if (options.create.dto) {
                    return CrudService.arrayToDto(options.create.dto, result);
                }

                return result;
            };
        }

        if (options.update) {
            this.update = async function (params) {
                if (options.update.requiredProperties) {
                    for (let key of options.update.requiredProperties) {
                        if (!params[key]) {
                            throw new ApiRequestError(`No ${key} provided.`, 400);
                        }
                    }
                }

                const pk = params[foreignKeyName];
                if (!pk) {
                    throw new ApiRequestError(`No ${foreignKeyName} provided.`, 400);
                }

                const model = await Model.findByPk(pk);
                if (!model) {
                    throw new ApiRequestError(`No ${Model.name} found with ${foreignKeyName} ${pk}.`, 400);
                }

                const properties = {};
                for (let key of options.update.properties) {
                    if (params[key]) properties[key] = params[key];
                }
                
                const result = await model.update(properties);

                if (options.update.dto) {
                    return CrudService.arrayToDto(options.update.dto, result);
                }

                return result;
            };
        }

        if (options.delete) {
            this.destroy = async function (params) {
                const pk = params[foreignKeyName];
                if (!pk) {
                    throw new ApiRequestError(`No ${foreignKeyName} provided.`, 400);
                }

                await Model.destroy({ where: { [foreignKeyName]: pk } });
            };
        }
    }

    static arrayToDto(properties, body) {
        return properties.reduce((acc, key) => {
            acc[key] = body[key];
            return acc;
        }, {});
    }
}
