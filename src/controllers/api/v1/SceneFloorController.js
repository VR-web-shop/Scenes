import LinkService from '../../../services/LinkService.js';
import Middleware from "../../../jwt/MiddlewareJWT.js";
import APIActorError from '../errors/APIActorError.js';
import ModelCommandService from '../../../services/ModelCommandService.js';
import ModelQueryService from '../../../services/ModelQueryService.js';
import PutCommand from '../../../commands/SceneFloor/PutCommand.js';
import DeleteCommand from '../../../commands/SceneFloor/DeleteCommand.js';
import ReadOneQuery from '../../../queries/SceneFloor/ReadOneQuery.js';
import ReadCollectionQuery from '../../../queries/SceneFloor/ReadCollectionQuery.js';
import rollbar from '../../../../rollbar.js';
import express from 'express';

const router = express.Router();
const cmdService = new ModelCommandService();
const queryService = new ModelQueryService();

router.route('/api/v1/scene_floors')
    /**
     * @openapi
     * '/api/v1/scene_floors':
     *  get:
     *     tags:
     *       - Scene Floor Controller
     *     summary: Fetch all scene floors
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
     *               name:
     *                type: string
     *               position_client_side_uuid:
     *                type: string
     *               rotation_client_side_uuid:
     *                type: string
     *               scale_client_side_uuid:
     *                type: string
     *               mesh_client_side_uuid:
     *                type: string
     *               scene_client_side_uuid:
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
    .get(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scene-floors:index"), async (req, res) => {
        try {
            const { limit, page } = req.query
            const { rows, count, pages } = await queryService.invoke(new ReadCollectionQuery({limit, page}))
            res.send({ 
                rows, 
                count, 
                pages,
                ...LinkService.paginateLinks(`api/v1/scene_floors`, parseInt(page), pages),
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
     * '/api/v1/scene_floors':
     * post:
     *  tags:
     *   - Scene Floor Controller
     * summary: Create a new scene floor
     * requestBody:
     *  required: true
     *  content:
     *   application/json:
     *    schema:
     *     type: object
     *     properties:
     *      client_side_uuid:
     *       type: string
     *      name:
     *       type: string
     *      position_client_side_uuid:
     *       type: string
     *      rotation_client_side_uuid:
     *       type: string
     *      scale_client_side_uuid:
     *       type: string
     *      mesh_client_side_uuid:
     *       type: string
     *      scene_client_side_uuid:
     *       type: string
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
     *       name:
     *        type: string
     *       position_client_side_uuid:
     *        type: string
     *       rotation_client_side_uuid:
     *        type: string
     *       scale_client_side_uuid:
     *        type: string
     *       mesh_client_side_uuid:
     *        type: string
     *       scene_client_side_uuid:
     *        type: string
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
    router.post(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT('scene-floors:put'), async (req, res) => {
        try {
            const { 
                client_side_uuid, 
                name,
                position_client_side_uuid,
                rotation_client_side_uuid,
                scale_client_side_uuid,
                mesh_client_side_uuid,
                scene_client_side_uuid,
            } = req.body;
            cmdService.invoke(new PutCommand(client_side_uuid, { 
                name,
                position_client_side_uuid,
                rotation_client_side_uuid,
                scale_client_side_uuid,
                mesh_client_side_uuid,
                scene_client_side_uuid,
            }));
            const response = queryService.invoke(new ReadOneQuery(client_side_uuid));
            res.send({ 
                ...response,
                ...LinkService.entityLinks(`api/v1/scene_floors`, 'POST', [
                    { name: 'get', method: 'GET' },
                    { name: 'update', method: 'PATCH' },
                    { name: 'delete', method: 'DELETE' },
                ], `api/v1/scene_floor/${client_side_uuid}`) 
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

router.route('/api/v1/scene_floor/:client_side_uuid')
    /**
     * @openapi
     * '/api/v1/scene_floor/{client_side_uuid}':
     *  get:
     *     tags:
     *       - Scene Floor Controller
     *     summary: Fetch a scene floor
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
     *               name:
     *                 type: string
     *               position_client_side_uuid:
     *                 type: string
     *               rotation_client_side_uuid:
     *                 type: string
     *               scale_client_side_uuid:
     *                 type: string
     *               mesh_client_side_uuid:
     *                 type: string
     *               scene_client_side_uuid:
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
    .get(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scene-floors:show"), async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const response = await queryService.invoke(new ReadOneQuery(client_side_uuid))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/scene_floor/${client_side_uuid}`, "GET", [
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
    * '/api/v1/scene_floor/{client_side_uuid}':
    *  patch:
    *     tags:
    *       - Scene Floor Controller
    *     summary: Update a scene floor
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
    *          - name
    *          - position_client_side_uuid
    *          - rotation_client_side_uuid
    *          - scale_client_side_uuid
    *          - mesh_client_side_uuid
    *          - scene_client_side_uuid
    *         properties:
    *          name:
    *           type: string
    *          position_client_side_uuid:
    *           type: string
    *          rotation_client_side_uuid:
    *           type: string
    *          scale_client_side_uuid:
    *           type: string
    *          mesh_client_side_uuid:
    *           type: string
    *          scene_client_side_uuid:
    *           type: string
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
    *               name:
    *                 type: string
    *               position_client_side_uuid:
    *                 type: string
    *               rotation_client_side_uuid:
    *                 type: string
    *               scale_client_side_uuid:
    *                 type: string
    *               mesh_client_side_uuid:
    *                 type: string
    *               scene_client_side_uuid:
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
    .patch(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scene-floors:put"), async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const { 
                name,
                position_client_side_uuid,
                rotation_client_side_uuid,
                scale_client_side_uuid,
                mesh_client_side_uuid,
                scene_client_side_uuid,
            } = req.body

            await cmdService.invoke(new PutCommand(client_side_uuid, { 
                name,
                position_client_side_uuid,
                rotation_client_side_uuid,
                scale_client_side_uuid,
                mesh_client_side_uuid,
                scene_client_side_uuid,
            }))
            const response = await queryService.invoke(new ReadOneQuery(client_side_uuid))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/scene_floor/${client_side_uuid}`, "PATCH", [
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
    * '/api/v1/scene_floor/{client_side_uuid}':
    *  delete:
    *     tags:
    *       - Scene Floor Controller
    *     summary: Delete a scene floor
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
    .delete(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scene-floors:delete"), async (req, res) => {
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

export default router;
