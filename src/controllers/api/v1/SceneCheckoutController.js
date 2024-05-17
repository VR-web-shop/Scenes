import LinkService from '../../../services/LinkService.js';
import Middleware from "../../../jwt/MiddlewareJWT.js";
import APIActorError from '../errors/APIActorError.js';
import ModelCommandService from '../../../services/ModelCommandService.js';
import ModelQueryService from '../../../services/ModelQueryService.js';
import PutCommand from '../../../commands/SceneCheckout/PutCommand.js';
import DeleteCommand from '../../../commands/SceneCheckout/DeleteCommand.js';
import ReadOneQuery from '../../../queries/SceneCheckout/ReadOneQuery.js';
import ReadCollectionQuery from '../../../queries/SceneCheckout/ReadCollectionQuery.js';
import rollbar from '../../../../rollbar.js';
import express from 'express';

const router = express.Router();
const cmdService = new ModelCommandService();
const queryService = new ModelQueryService();

router.route('/api/v1/scene_checkouts')
    /**
     * @openapi
     * '/api/v1/scene_checkouts':
     *  get:
     *     tags:
     *       - Scene Checkout Controller
     *     summary: Fetch all scene checkouts
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
     *               surface_offset_client_side_uuid:
     *                type: string
     *               surface_size_client_side_uuid:
     *                type: string
     *               ui_offset_position_client_side_uuid:
     *                type: string
     *               ui_offset_rotation_client_side_uuid:
     *                type: string
     *               ui_scale_client_side_uuid:
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
    .get(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scene-checkouts:index"), async (req, res) => {
        try {
            const { limit, page } = req.query
            const { rows, count, pages } = await queryService.invoke(new ReadCollectionQuery({limit, page}))
            res.send({ 
                rows, 
                count, 
                pages,
                ...LinkService.paginateLinks(`api/v1/scene_checkouts`, parseInt(page), pages),
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
     * '/api/v1/scene_checkouts':
     * post:
     *  tags:
     *   - Scene Checkout Controller
     * summary: Create a scene checkout
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
     *      surface_offset_client_side_uuid:
     *       type: string
     *      surface_size_client_side_uuid:
     *       type: string
     *      ui_offset_position_client_side_uuid:
     *       type: string
     *      ui_offset_rotation_client_side_uuid:
     *       type: string
     *      ui_scale_client_side_uuid:
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
     *       surface_offset_client_side_uuid:
     *        type: string
     *       surface_size_client_side_uuid:
     *        type: string
     *       ui_offset_position_client_side_uuid:
     *        type: string
     *       ui_offset_rotation_client_side_uuid:
     *        type: string
     *       ui_scale_client_side_uuid:
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
    router.post(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT('scene-checkouts:put'), async (req, res) => {
        try {
            const { 
                client_side_uuid, 
                name,
                position_client_side_uuid,
                rotation_client_side_uuid,
                scale_client_side_uuid,
                surface_offset_client_side_uuid,
                surface_size_client_side_uuid,
                ui_offset_position_client_side_uuid,
                ui_offset_rotation_client_side_uuid,
                ui_scale_client_side_uuid,
                mesh_client_side_uuid,
                scene_client_side_uuid,
            } = req.body;
            cmdService.invoke(new PutCommand(client_side_uuid, { 
                name,
                position_client_side_uuid,
                rotation_client_side_uuid,
                scale_client_side_uuid,
                surface_offset_client_side_uuid,
                surface_size_client_side_uuid,
                ui_offset_position_client_side_uuid,
                ui_offset_rotation_client_side_uuid,
                ui_scale_client_side_uuid,
                mesh_client_side_uuid,
                scene_client_side_uuid,
            }));
            const response = queryService.invoke(new ReadOneQuery(client_side_uuid));
            res.send({ 
                ...response,
                ...LinkService.entityLinks(`api/v1/scene_checkouts`, 'POST', [
                    { name: 'get', method: 'GET' },
                    { name: 'update', method: 'PATCH' },
                    { name: 'delete', method: 'DELETE' },
                ], `api/v1/scene_checkout/${client_side_uuid}`) 
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

router.route('/api/v1/scene_checkout/:client_side_uuid')
    /**
     * @openapi
     * '/api/v1/scene_checkout/{client_side_uuid}':
     *  get:
     *     tags:
     *       - Scene Checkout Controller
     *     summary: Fetch a single scene checkout
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
     *               surface_offset_client_side_uuid:
     *                 type: string
     *               surface_size_client_side_uuid:
     *                 type: string
     *               ui_offset_position_client_side_uuid:
     *                 type: string
     *               ui_offset_rotation_client_side_uuid:
     *                 type: string
     *               ui_scale_client_side_uuid:
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
    .get(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scene-checkouts:show"), async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const response = await queryService.invoke(new ReadOneQuery(client_side_uuid))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/scene_checkout/${client_side_uuid}`, "GET", [
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
    * '/api/v1/scene_checkout/{client_side_uuid}':
    *  patch:
    *     tags:
    *       - Scene Checkout Controller
    *     summary: Update a scene checkout
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
    *          - surface_offset_client_side_uuid
    *          - surface_size_client_side_uuid
    *          - ui_offset_position_client_side_uuid
    *          - ui_offset_rotation_client_side_uuid
    *          - ui_scale_client_side_uuid
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
    *          surface_offset_client_side_uuid:
    *           type: string
    *          surface_size_client_side_uuid:
    *           type: string
    *          ui_offset_position_client_side_uuid:
    *           type: string
    *          ui_offset_rotation_client_side_uuid:
    *           type: string
    *          ui_scale_client_side_uuid:
    *           type: string
    *          mesh_client_side_uuid:
    *           type: string
    *          scene_client_side_uuid:
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
    *               surface_offset_client_side_uuid:
    *                 type: string
    *               surface_size_client_side_uuid:
    *                 type: string
    *               ui_offset_position_client_side_uuid:
    *                 type: string
    *               ui_offset_rotation_client_side_uuid:
    *                 type: string
    *               ui_scale_client_side_uuid:
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
    .patch(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scene-checkouts:put"), async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const { 
                name,
                position_client_side_uuid,
                rotation_client_side_uuid,
                scale_client_side_uuid,
                surface_offset_client_side_uuid,
                surface_size_client_side_uuid,
                ui_offset_position_client_side_uuid,
                ui_offset_rotation_client_side_uuid,
                ui_scale_client_side_uuid,
                mesh_client_side_uuid,
                scene_client_side_uuid,
            } = req.body

            await cmdService.invoke(new PutCommand(client_side_uuid, { 
                name,
                position_client_side_uuid,
                rotation_client_side_uuid,
                scale_client_side_uuid,
                surface_offset_client_side_uuid,
                surface_size_client_side_uuid,
                ui_offset_position_client_side_uuid,
                ui_offset_rotation_client_side_uuid,
                ui_scale_client_side_uuid,
                mesh_client_side_uuid,
                scene_client_side_uuid,
            }))
            const response = await queryService.invoke(new ReadOneQuery(client_side_uuid))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/scene_checkout/${client_side_uuid}`, "PATCH", [
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
    * '/api/v1/scene_checkout/{client_side_uuid}':
    *  delete:
    *     tags:
    *       - Scene Checkout Controller
    *     summary: Delete a scene checkout
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
    .delete(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scene-checkouts:delete"), async (req, res) => {
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
