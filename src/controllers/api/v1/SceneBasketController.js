import LinkService from '../../../services/LinkService.js';
import Middleware from "../../../jwt/MiddlewareJWT.js";
import APIActorError from '../errors/APIActorError.js';
import ModelCommandService from '../../../services/ModelCommandService.js';
import ModelQueryService from '../../../services/ModelQueryService.js';
import PutCommand from '../../../commands/SceneBasket/PutCommand.js';
import ReadOneQuery from '../../../queries/SceneBasket/ReadOneElasticQuery.js';
import ReadCollectionQuery from '../../../queries/SceneBasket/ReadCollectionElasticQuery.js';
import rollbar from '../../../../rollbar.js';
import express from 'express';

const router = express.Router();
const cmdService = new ModelCommandService();
const queryService = new ModelQueryService();

router.route('/api/v1/scene_baskets')
    /**
     * @openapi
     * '/api/v1/scene_baskets':
     *  get:
     *     tags:
     *       - Scene Basket Controller
     *     summary: Fetch all scene baskets
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
     *               position_client_side_uuid:
     *                type: string
     *               rotation_client_side_uuid:
     *                type: string
     *               scale_client_side_uuid:
     *                type: string
     *               object_offset_client_side_uuid:
     *                type: string
     *               placeholder_offset_client_side_uuid:
     *                type: string
     *               pocket_offset_client_side_uuid:
     *                type: string
     *               insert_area_offset_client_side_uuid:
     *                type: string
     *               insert_area_size_client_side_uuid:
     *                type: string
     *               object_client_side_uuid:
     *                type: string
     *               placeholder_client_side_uuid:
     *                type: string
     *               pocket_client_side_uuid:
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
    .get(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scenes:index"), async (req, res) => {
        try {
            const { limit, page } = req.query
            const { rows, count, pages } = await queryService.invoke(new ReadCollectionQuery({limit, page}))
            res.send({ 
                rows, 
                count, 
                pages,
                ...LinkService.paginateLinks(`api/v1/scene_baskets`, parseInt(page), pages),
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
router.route('/api/v1/scene_basket/:client_side_uuid')
    /**
     * @openapi
     * '/api/v1/scene_basket/{client_side_uuid}':
     *  get:
     *     tags:
     *       - Scene Basket Controller
     *     summary: Fetch a scene basket
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
     *               position_client_side_uuid:
     *                 type: string
     *               rotation_client_side_uuid:
     *                 type: string
     *               scale_client_side_uuid:
     *                 type: string
     *               object_offset_client_side_uuid:
     *                 type: string
     *               placeholder_offset_client_side_uuid:
     *                 type: string
     *               pocket_offset_client_side_uuid:
     *                 type: string
     *               insert_area_offset_client_side_uuid:
     *                 type: string
     *               insert_area_size_client_side_uuid:
     *                 type: string
     *               object_client_side_uuid:
     *                 type: string
     *               placeholder_client_side_uuid:
     *                 type: string
     *               pocket_client_side_uuid:
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
    .get(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scenes:show"), async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const response = await queryService.invoke(new ReadOneQuery(client_side_uuid))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/scene_basket/${client_side_uuid}`, "GET", [
                    { name: 'update', method: 'PATCH' },
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
    * '/api/v1/scene_basket/{client_side_uuid}':
    *  patch:
    *     tags:
    *       - Scene Basket Controller
    *     summary: Update a scene basket
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
    *          - position_client_side_uuid
    *          - rotation_client_side_uuid
    *          - scale_client_side_uuid
    *          - object_offset_client_side_uuid
    *          - placeholder_offset_client_side_uuid
    *          - pocket_offset_client_side_uuid
    *          - insert_area_offset_client_side_uuid
    *          - insert_area_size_client_side_uuid
    *          - object_client_side_uuid
    *          - placeholder_client_side_uuid
    *          - pocket_client_side_uuid
    *         properties:
    *          position_client_side_uuid:
    *           type: string
    *          rotation_client_side_uuid:
    *           type: string
    *          scale_client_side_uuid:
    *           type: string
    *          object_offset_client_side_uuid:
    *           type: string
    *          placeholder_offset_client_side_uuid:
    *           type: string
    *          pocket_offset_client_side_uuid:
    *           type: string
    *          insert_area_offset_client_side_uuid:
    *           type: string
    *          insert_area_size_client_side_uuid:
    *           type: string
    *          object_client_side_uuid:
    *           type: string
    *          placeholder_client_side_uuid:
    *           type: string
    *          pocket_client_side_uuid:
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
    *                 type: string
    *               position_client_side_uuid:
    *                 type: string
    *               rotation_client_side_uuid:
    *                 type: string
    *               scale_client_side_uuid:
    *                 type: string
    *               object_offset_client_side_uuid:
    *                 type: string
    *               placeholder_offset_client_side_uuid:
    *                 type: string
    *               pocket_offset_client_side_uuid:
    *                 type: string
    *               insert_area_offset_client_side_uuid:
    *                 type: string
    *               insert_area_size_client_side_uuid:
    *                 type: string
    *               object_client_side_uuid:
    *                 type: string
    *               placeholder_client_side_uuid:
    *                 type: string
    *               pocket_client_side_uuid:
    *                 type: string
    *               basket_state_name:
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
    .patch(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scenes:put"), async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const { 
                position_client_side_uuid,
                rotation_client_side_uuid,
                scale_client_side_uuid,
                object_offset_client_side_uuid,
                placeholder_offset_client_side_uuid,
                pocket_offset_client_side_uuid,
                insert_area_offset_client_side_uuid,
                insert_area_size_client_side_uuid,
                object_client_side_uuid,
                placeholder_client_side_uuid,
                pocket_client_side_uuid,
                scene_basket_state_name,
            } = req.body

            await cmdService.invoke(new PutCommand(client_side_uuid, { 
                position_client_side_uuid,
                rotation_client_side_uuid,
                scale_client_side_uuid,
                object_offset_client_side_uuid,
                placeholder_offset_client_side_uuid,
                pocket_offset_client_side_uuid,
                insert_area_offset_client_side_uuid,
                insert_area_size_client_side_uuid,
                object_client_side_uuid,
                placeholder_client_side_uuid,
                pocket_client_side_uuid,
                scene_basket_state_name, 
            }))
            const response = await queryService.invoke(new ReadOneQuery(client_side_uuid))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/scene_basket/${client_side_uuid}`, "PATCH", [
                    { name: 'get', method: 'GET' },
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
