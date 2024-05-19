import LinkService from '../../../services/LinkService.js';
import Middleware from "../../../jwt/MiddlewareJWT.js";
import APIActorError from '../errors/APIActorError.js';
import ModelQueryService from '../../../services/ModelQueryService.js';
import ReadOneQuery from '../../../queries/SceneProductState/ReadOneElasticQuery.js';
import ReadCollectionQuery from '../../../queries/SceneProductState/ReadCollectionElasticQuery.js';
import rollbar from '../../../../rollbar.js';
import express from 'express';

const router = express.Router();
const queryService = new ModelQueryService();

router.route('/api/v1/scene_product_states')
    /**
     * @openapi
     * '/api/v1/scene_product_states':
     *  get:
     *     tags:
     *       - Scene Product State Controller
     *     summary: Fetch all scene product states
     *     security:
     *      - bearerAuth: []
     *     parameters:
     *      - in: query
     *        name: page
     *        required: false
     *        schema:
     *         type: integer
     *      - in: query
     *        name: limit
     *        required: true
     *        schema:
     *         type: integer
     *     responses:
     *      200:
     *        description: OK
     *        content:
     *         application/json:
     *           schema:
     *             type: array
     *             items:
     *              type: object
     *              properties:
     *               name:
     *                type: string
     *               _links:
     *                type: object
     *                properties:
     *                 self:
     *                  type: object
     *                  properties:
     *                   href:
     *                    type: string
     *                   method:
     *                    type: string
     *                 next:
     *                  type: object
     *                  properties:
     *                   href:
     *                    type: string
     *                   method:
     *                    type: string
     *                 prev:
     *                  type: object
     *                  properties:
     *                   href:
     *                    type: string
     *                   method:
     *                    type: string
     *      404:
     *        description: Not Found
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal Server Error
     */
    .get(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scenes:index"), async (req, res) => {
        try {
            const { limit, page } = req.query
            const { rows, count, pages } = await queryService.invoke(new ReadCollectionQuery({limit, page}))
            res.send({ 
                rows, 
                count, 
                pages,
                ...LinkService.paginateLinks(`api/v1/scene_product_states`, parseInt(page), pages),
            })
        } catch (error) {
            if (error instanceof APIActorError) {
                rollbar.info('APIActorError', { code: error.statusCode, message: error.message })
                return res.status(error.statusCode).send({ message: error.message })
            }

            rollbar.error(error)
            console.error(error)
            return res.status(500).send({ message: 'Internal Server Error' })
        }
    })
router.route('/api/v1/scene_product_state/:name')
    /**
     * @openapi
     * '/api/v1/scene_product_state/{name}':
     *  get:
     *     tags:
     *       - Scene Product State Controller
     *     summary: Fetch a scene product state
     *     security:
     *      - bearerAuth: []
     *     parameters:
     *      - in: path
     *        name: name
     *        required: true
     *        schema:
     *         type: string
     *     responses:
     *      200:
     *        description: OK
     *        content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               _links:
     *                 type: object
     *                 properties:
     *                  self:
     *                   type: object
     *                   properties:
     *                    href:
     *                     type: string
     *                    method:
     *                     type: string
     * 
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal Server Error
     */
    .get(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scenes:show"), async (req, res) => {
        try {
            const { name } = req.params
            const response = await queryService.invoke(new ReadOneQuery(name))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/scene_product_state/${name}`, "GET", [
                ])
            })
        } catch (error) {
            if (error instanceof APIActorError) {
                rollbar.info('APIActorError', { code: error.statusCode, message: error.message })
                return res.status(error.statusCode).send({ message: error.message })
            }

            rollbar.error(error)
            console.error(error)
            return res.status(500).send({ message: 'Internal Server Error' })
        }
    })

export default router;
