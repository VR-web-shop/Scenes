import ApiRequestError from './ApiRequestError.js';
import express from 'express';

/**
 * Options:
 * - find: { 
 *      middleware: [],
 *      includes: [
 *         { endpoint: string, model: string }
 *      ] 
 *   }
 * - findAll: { middleware: [] }
 * - create: { middleware: [], properties: [] }
 * - update: { middleware: [], properties: [], requiredProperties: [] }
 * - delete: { middleware: [] }
 */
function RestController(endpoint, pkName, service, options={}) {
    if (!endpoint) throw new Error('No endpoint provided.');
    if (!pkName) throw new Error('No primary key name provided.');
    if (!service) throw new Error('No service provided.');
    if (!options) throw new Error('No options provided.');

    const router = express.Router();

    if (options.find) {
        router.route(`${endpoint}/:${pkName}`)
            .get(options.find.middleware, async (req, res) => {
                const pk = req.params[pkName];
                if (!pk) {
                    return res.status(400).send(`No ${pkName} provided.`);
                }

                try {
                    const entity = await service.find({[pkName]: pk});
                    if (!entity) {
                        return res.status(404).send(`No entity found with ${pkName} ${pk}.`);
                    }

                    return res.send(entity);
                } catch (e) {
                    if (e instanceof ApiRequestError) {
                        return res.status(e.status).send(e.message);
                    }

                    console.error(e);
                    return res.status(500).send("Internal server error.");
                }
            });
    }

    if (options.find.includes) {
        for (let include of options.find.includes) {
            const { endpoint: includeEndpoint, model: includeModel } = include;

            router.route(`${endpoint}/:${pkName}/${includeEndpoint}`)
                .get(options.find.middleware, async (req, res) => {
                    const pk = req.params[pkName];
                    if (!pk) {
                        return res.status(400).send(`No ${pkName} provided.`);
                    }

                    try {
                        const entity = await service.find({[pkName]: pk}, {include: includeModel});
                        if (!entity) {
                            return res.status(404).send(`No entity found with ${pkName} ${pk}.`);
                        }
    
                        return res.send(entity);
                    } catch (e) {
                        if (e instanceof ApiRequestError) {
                            return res.status(e.status).send(e.message);
                        }
    
                        console.error(e);
                        return res.status(500).send("Internal server error.");
                    }
                });
        }
    }

    if (options.findAll) {
        router.route(endpoint)        
            .get(options.findAll.middleware, async (req, res) => {
                try {
                    const { page, limit, q, include } = req.query;
                    const { count, pages, rows } = await service.findAll({page, limit, q}, {include});
                    return res.send({ count, pages, rows });
                } catch (e) {
                    if (e instanceof ApiRequestError) {
                        return res.status(e.status).send(e.message);
                    }

                    console.error(e);
                    return res.status(500).send("Internal server error.");
                }
            })
    }

    if (options.create) {
        router.route(endpoint)    
            .post(options.create.middleware, async (req, res) => {
                const properties = {}
                for (let key of options.create.properties) {
                    if (!req.body[key]) {
                        return res.status(400).send(`No ${key} provided.`);
                    }

                    properties[key] = req.body[key];
                }

                try {
                    const entity = await service.create(properties);
                    return res.send(entity);
                } catch (e) {
                    if (e instanceof ApiRequestError) {
                        return res.status(e.status).send(e.message);
                    }

                    console.error(e);
                    return res.status(500).send("Internal server error.");
                }
            })
    }

    if (options.update) {
        router.route(endpoint)  
            .put(options.update.middleware, async (req, res) => {
                const pk = req.body[pkName];
                if (!pk) {
                    return res.status(400).send(`No ${pkName} provided.`);
                }

                const requiredProperties = options.update.requiredProperties || [];
                for (let key of requiredProperties) {
                    if (!req.body[key]) {
                        return res.status(400).send(`No ${key} provided.`);
                    }
                }

                try {
                    const properties = { [pkName]: pk };
                    for (let key of options.create.properties) {
                        if (req.body[key]) properties[key] = req.body[key];
                    }

                    const entity = await service.update(properties);
                    return res.send(entity);
                } catch (e) {
                    if (e instanceof ApiRequestError) {
                        return res.status(e.status).send(e.message);
                    }

                    console.error(e);
                    return res.status(500).send("Internal server error.");
                }
            })
    }

    if (options.delete) {
        router.route(endpoint)  
            .delete(options.delete.middleware, async (req, res) => {
                const pk = req.body[pkName];
                if (!pk) {
                    return res.status(400).send(`No ${pkName} provided.`);
                }
                
                try {
                    await service.destroy({[pkName]: pk});
                    return res.sendStatus(204);
                } catch (e) {
                    if (e instanceof ApiRequestError) {
                        return res.status(e.status).send(e.message);
                    }

                    console.error(e);
                    return res.status(500).send("Internal server error.");
                }
            });
    }

    return router;
}

export default RestController;
