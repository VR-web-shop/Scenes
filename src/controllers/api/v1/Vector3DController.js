import LinkService from '../../../services/LinkService.js';
import Middleware from "../../../jwt/MiddlewareJWT.js";
import APIActorError from '../errors/APIActorError.js';
import ModelCommandService from '../../../services/ModelCommandService.js';
import ModelQueryService from '../../../services/ModelQueryService.js';
import PutCommand from '../../../commands/Vector3D/PutCommand.js';
import DeleteCommand from '../../../commands/Vector3D/DeleteCommand.js';
import ReadOneQuery from '../../../queries/Vector3D/ReadOneElasticQuery.js';
import ReadCollectionQuery from '../../../queries/Vector3D/ReadCollectionElasticQuery.js';
import SearchElasticQuery from '../../../queries/Vector3D/SearchElasticQuery.js';
import ReadCollectionMysqlQuery from '../../../queries/Vector3D/ReadCollectionQuery.js';
import { Op } from 'sequelize';
import rollbar from '../../../../rollbar.js';
import express from 'express';

const router = express.Router();
const cmdService = new ModelCommandService();
const queryService = new ModelQueryService();

router.route('/api/v1/vector3ds')
    /**
     * @openapi
     * '/api/v1/vector3ds':
     *  get:
     *     tags:
     *       - Vector3D Controller
     *     summary: Fetch all vector3ds
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
     *               client_side_uuid:
     *                type: string
     *               x:
     *                type: number
     *               y:
     *                type: number
     *               z:
     *                type: number
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
    .get(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("vector3ds:index"), async (req, res) => {
        try {
            const { limit, page } = req.query
            const { rows, count, pages } = await queryService.invoke(new ReadCollectionQuery({ limit, page }))
            res.send({
                rows,
                count,
                pages,
                ...LinkService.paginateLinks(`api/v1/vector3ds`, parseInt(page), pages),
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
/**
 * @openapi
 * '/api/v1/vector3ds':
 * post:
 *  tags:
 *   - Vector3D Controller
 * summary: Create a vector3d
 * requestBody:
 *  required: true
 *  content:
 *   application/json:
 *    schema:
 *     type: object
 *     properties:
 *      client_side_uuid:
 *       type: string
 *      x:
 *       type: number
 *      y:
 *       type: number
 *      z:
 *       type: number
 * responses:
 *  200:
 *   description: OK
 *   content:
 *    application/json:
 *     schema:
 *      type: object
 *      properties:
 *       client_side_uuid:
 *        type: string
 *       x:
 *        type: number
 *       y:
 *        type: number
 *       z:
 *        type: number
 *       _links:
 *        type: object
 *        properties:
 *         get:
 *          type: object
 *          properties:
 *           href:
 *            type: string
 *           method:
 *            type: string
 *         update:
 *          type: object
 *          properties:
 *           href:
 *            type: string
 *           method:
 *            type: string
 *         delete:
 *          type: object
 *          properties:
 *           href:
 *            type: string
 *           method:
 *            type: string
 *  400:
 *   description: Bad Request
 *  500:
 *  description: Internal Server Error
 */
router.post(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT('vector3ds:put'), async (req, res) => {
    try {
        const {
            client_side_uuid,
            x,
            y,
            z,
        } = req.body;
        cmdService.invoke(new PutCommand(client_side_uuid, {
            x,
            y,
            z,
        }));
        const response = queryService.invoke(new ReadOneQuery(client_side_uuid));
        res.send({
            ...response,
            ...LinkService.entityLinks(`api/v1/vector3ds`, 'POST', [
                { name: 'get', method: 'GET' },
                { name: 'update', method: 'PATCH' },
                { name: 'delete', method: 'DELETE' },
            ], `api/v1/vector3d/${client_side_uuid}`)
        });
    } catch (error) {
        if (error instanceof RequestError) {
            rollbar.info('RequestError', { code: error.code, message: error.message })
            return res.status(error.code).send({ message: error.message })
        }

        rollbar.error(error)
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
});

router.route('/api/v1/vector3d/:client_side_uuid')
    /**
     * @openapi
     * '/api/v1/vector3d/{client_side_uuid}':
     *  get:
     *     tags:
     *       - Vector3D Controller
     *     summary: Fetch a single vector3d
     *     security:
     *      - bearerAuth: []
     *     parameters:
     *      - in: path
     *        name: client_side_uuid
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
     *               client_side_uuid:
     *                type: string
     *               x:
     *                 type: number
     *               y:
     *                 type: number
     *               z:
     *                 type: number
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
     *                  update:
     *                   type: object
     *                   properties:
     *                    href:
     *                     type: string
     *                    method:
     *                     type: string
     *                  delete:
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
    .get(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("vector3ds:show"), async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const response = await queryService.invoke(new ReadOneQuery(client_side_uuid))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/vector3d/${client_side_uuid}`, "GET", [
                    { name: 'update', method: 'PATCH' },
                    { name: 'delete', method: 'DELETE' }
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
    /**
    * @openapi
    * '/api/v1/vector3d/{client_side_uuid}':
    *  patch:
    *     tags:
    *       - Vector3D Controller
    *     summary: Update a vector3d
    *     security:
    *      - bearerAuth: []
    *     parameters:
    *     - in: path
    *       name: client_side_uuid
    *       required: true
    *       schema:
    *        type: string
    *     requestBody:
    *      required: true
    *      content:
    *       application/json:
    *        schema:
    *         type: object
    *         required:
    *          - x
    *          - y
    *          - z
    *         properties:
    *          x:
    *           type: number
    *          y:
    *           type: number
    *          z:
    *           type: number
    *     responses:
    *      200:
    *        description: OK
    *        content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               client_side_uuid:
    *                type: string
    *               x:
    *                 type: number
    *               y:
    *                 type: number
    *               z:
    *                 type: number
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
    *                  get:
    *                   type: object
    *                   properties:
    *                    href:
    *                     type: string
    *                    method:
    *                     type: string
    *                  delete:
    *                   type: object
    *                   properties:
    *                    href:
    *                     type: string
    *                    method:
    *                     type: string
    *      400:
    *        description: Bad Request
    *      404:
    *        description: Not Found
    *      401:
    *        description: Unauthorized
    *      500:
    *        description: Internal Server Error
    */
    .patch(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("vector3ds:put"), async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const {
                x,
                y,
                z,
            } = req.body
            await cmdService.invoke(new PutCommand(client_side_uuid, {
                x,
                y,
                z,
            }))
            const response = await queryService.invoke(new ReadOneQuery(client_side_uuid))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/vector3d/${client_side_uuid}`, "PATCH", [
                    { name: 'get', method: 'GET' },
                    { name: 'delete', method: 'DELETE' }
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
    /**
    * @openapi
    * '/api/v1/vector3d/{client_side_uuid}':
    *  delete:
    *     tags:
    *       - Vector3D Controller
    *     summary: Delete a vector3d
    *     security:
    *      - bearerAuth: []
    *     parameters:
    *     - in: path
    *       name: client_side_uuid
    *       required: true
    *       schema:
    *        type: string
    *     responses:
    *      204:
    *        description: No Content
    *      400:
    *        description: Bad Request
    *      404:
    *        description: Not Found
    *      401:
    *        description: Unauthorized
    *      500:
    *        description: Internal Server Error
    */
    .delete(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("vector3ds:delete"), async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            await cmdService.invoke(new DeleteCommand(client_side_uuid))
            res.sendStatus(204)
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
router.route('/api/v1/vector3ds/batch')
    /**
     * @openapi
     * '/api/v1/vector3ds/batch':
     *  post:
     *     tags:
     *       - Vector3D Controller
     *     summary: Fetch a batch of vector3ds by client_side_uuids
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *         type: object
     *         properties:
     *          client_side_uuids:
     *           type: array
     *           items:
     *            type: string
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
     *               client_side_uuid:
     *                type: string
     *               x:
     *                type: number
     *               y:
     *                type: number
     *               z:
     *                type: number
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
     *      404:
     *        description: Not Found
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal Server Error
     */
    .post(async (req, res) => {
        try {
            const { client_side_uuids } = req.body
            const { rows, count } = await queryService.invoke(new ReadCollectionMysqlQuery({
                where: [{
                    table: 'Vector3ds',
                    column: 'client_side_uuid',
                    operator: Op.in,
                    keys: 'client_side_uuids',
                    value: `${client_side_uuids.map(c=>`'${c}'`).join(',')}`
                }]
            }))
            res.send({
                rows,
                count,
                ...LinkService.entityLinks(`/api/v1/vector3ds/batch`, 'POST', []),
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
