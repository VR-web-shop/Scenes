import express from 'express';

/**
 * Options:
 * - find: { middleware: [] }
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
                    res.status(400).send(`No ${pkName} provided.`);
                }

                const entity = await service.find({[pkName]: pk});
                res.send(entity);
            });
    }

    if (options.findAll) {
        router.route(endpoint)        
            .get(options.findAll.middleware, async (req, res) => {
                const { page, limit, q } = req.query;
                const { count, pages, rows } = await service.findAll({page, limit, q});
                res.send({ count, pages, rows });
            })
    }

    if (options.create) {
        router.route(endpoint)    
            .post(options.create.middleware, async (req, res) => {
                const properties = {}
                for (let key of options.create.properties) {
                    if (!req.body[key]) {
                        res.status(400).send(`No ${key} provided.`);
                    }

                    properties[key] = req.body[key];
                }

                const entity = await service.create(properties);
                res.send(entity);
            })
    }

    if (options.update) {
        router.route(endpoint)  
            .put(options.update.middleware, async (req, res) => {
                const pk = req.body[pkName];
                if (!pk) {
                    res.status(400).send(`No ${pkName} provided.`);
                }

                const requiredProperties = options.update.requiredProperties || [];
                for (let key of requiredProperties) {
                    if (!req.body[key]) {
                        res.status(400).send(`No ${key} provided.`);
                    }
                }

                const properties = { [pkName]: pk };
                for (let key of options.create.properties) {
                    if (req.body[key]) properties[key] = req.body[key];
                }

                const entity = await service.update(properties);
                res.send(entity);
            })
    }

    if (options.delete) {
        router.route(endpoint)  
            .delete(options.delete.middleware, async (req, res) => {
                const pk = req.body[pkName];
                if (!pk) {
                    res.status(400).send(`No ${pkName} provided.`);
                }

                await service.destroy({[pkName]: pk});
                res.sendStatus(204);
            });
    }

    return router;
}

export default RestController;
