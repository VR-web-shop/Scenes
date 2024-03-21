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
            this.find = async function (params) {
                const pk = params[foreignKeyName];
                if (!pk) {
                    throw new Error(`No ${foreignKeyName} provided.`);
                }
                
                const result = await Model.findByPk(pk);

                if (options.find.dto) {
                    return CrudService.arrayToDto(options.find.dto, result);
                }

                return result;
            };
        }

        if (options.findAll) {
            this.findAll = async function (params) {
                const q = params.q;
                if (q) {
                    return await Model.findAll({
                        where: {
                            $or: options.findAll.searchProperties.map(prop => ({ [prop]: { like: '%' + q + '%' } }))
                        }
                    });
                }

                const limit = parseInt(params.limit) || options.findAll.defaultLimit || 10;
                const page = parseInt(params.page) || options.findAll.defaultPage || 1;
                
                const offset = (page - 1) * limit;
                const count = await Model.count();
                const pages = Math.ceil(count / limit);
                const rows = await Model.findAll({ limit, offset });
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
                        throw new Error(`No ${key} provided.`);
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
                            throw new Error(`No ${key} provided.`);
                        }
                    }
                }

                const pk = params[foreignKeyName];
                if (!pk) {
                    throw new Error(`No ${foreignKeyName} provided.`);
                }

                const model = await Model.findByPk(pk);
                if (!model) {
                    throw new Error(`No ${Model.name} found with ${foreignKeyName} ${pk}.`);
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
                    throw new Error(`No ${foreignKeyName} provided.`);
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
