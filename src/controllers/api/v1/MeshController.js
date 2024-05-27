import LinkService from '../../../services/LinkService.js';
import Middleware from "../../../jwt/MiddlewareJWT.js";
import APIActorError from '../errors/APIActorError.js';
import ModelCommandService from '../../../services/ModelCommandService.js';
import ModelQueryService from '../../../services/ModelQueryService.js';
import PutCommand from '../../../commands/Mesh/PutCommand.js';
import DeleteCommand from '../../../commands/Mesh/DeleteCommand.js';
import ReadOneQuery from '../../../queries/Mesh/ReadOneElasticQuery.js';
import ReadCollectionQuery from '../../../queries/Mesh/ReadCollectionElasticQuery.js';
import ReadOneMysqlQuery from '../../../queries/Mesh/ReadOneQuery.js';
import MeshMaterialReadCollectionQuery from '../../../queries/MeshMaterial/ReadCollectionQuery.js';
import MaterialReadCollectionQuery from '../../../queries/Material/ReadCollectionQuery.js';
import StorageService from '../../../services/StorageService.js';
import rollbar from '../../../../rollbar.js';
import express from 'express';
import multer from 'multer';
import { Op, where } from 'sequelize';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const cmdService = new ModelCommandService();
const queryService = new ModelQueryService();
const storage = new StorageService('meshes');

router.route('/api/v1/meshes')
    /**
     * @openapi
     * '/api/v1/meshes':
     *  get:
     *     tags:
     *       - Mesh Controller
     *     summary: Fetch all meshes
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
     *               source:
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
    .get(async (req, res) => {
        try {
            const { limit, page } = req.query
            const { rows, count, pages } = await queryService.invoke(new ReadCollectionQuery({limit, page}))
            res.send({ 
                rows, 
                count, 
                pages,
                ...LinkService.paginateLinks(`api/v1/meshes`, parseInt(page), pages),
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
     * '/api/v1/meshes':
     * post:
     *  tags:
     *   - Mesh Controller
     * summary: Create a mesh
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
     *      source:
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
     *       source:
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
    .post(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT('scenes:put'), upload.single('source'), async (req, res) => {
        try {
            const { client_side_uuid, name } = req.body;
            const source = await storage.put(req.file, client_side_uuid);
            
            await cmdService.invoke(new PutCommand(client_side_uuid, { 
                name, source 
            }));
            console.log('here')
            const response = await queryService.invoke(new ReadOneMysqlQuery(client_side_uuid));
            res.send({ 
                ...response,
                ...LinkService.entityLinks(`api/v1/meshes`, 'POST', [
                    { name: 'get', method: 'GET' },
                    { name: 'update', method: 'PATCH' },
                    { name: 'delete', method: 'DELETE' },
                ], `api/v1/mesh/${client_side_uuid}`) 
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

router.route('/api/v1/mesh/:client_side_uuid')
    /**
     * @openapi
     * '/api/v1/mesh/{client_side_uuid}':
     *  get:
     *     tags:
     *       - Mesh Controller
     *     summary: Fetch a mesh
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
     *               name:
     *                 type: string
     *               source:
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
                ...LinkService.entityLinks(`api/v1/mesh/${client_side_uuid}`, "GET", [
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
    * '/api/v1/mesh/{client_side_uuid}':
    *  patch:
    *     tags:
    *       - Mesh Controller
    *     summary: Update a mesh
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
    *          - source
    *         properties:
    *          name:
    *           type: string
    *          source:
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
    *               name:
    *                 type: string
    *               source:
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
    .patch(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scenes:put"), upload.single('source'), async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const { name } = req.body
            const entity = await queryService.invoke(new ReadOneQuery(client_side_uuid))
            const source = await storage.put(req.file, client_side_uuid, entity.source)
            await cmdService.invoke(new PutCommand(client_side_uuid, { 
                name, source 
            }))
            const response = await queryService.invoke(new ReadOneMysqlQuery(client_side_uuid))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/mesh/${client_side_uuid}`, "PATCH", [
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
    * '/api/v1/mesh/{client_side_uuid}':
    *  delete:
    *     tags:
    *       - Mesh Controller
    *     summary: Delete a mesh
    *     security:
    *      - bearerAuth: []
    *     parameters:
    *     - in: path
    *       name: name
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
    .delete(Middleware.AuthorizeJWT, Middleware.AuthorizePermissionJWT("scenes:delete"), async (req, res) => {
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

router.route('/api/v1/mesh/:client_side_uuid/mesh_materials')
      .get(async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const response = await queryService.invoke(new ReadOneMysqlQuery(client_side_uuid))
            const { rows: meshMaterials } = await queryService.invoke(new MeshMaterialReadCollectionQuery({
                where: [{
                    table: 'MeshMaterialDescriptions',
                    column: 'mesh_client_side_uuid',
                    operator: Op.eq,
                    keys: 'client_side_uuid',
                    value: client_side_uuid
                }]
            }))
            
            const meshMaterialsIds = meshMaterials.map(m => m.material_client_side_uuid)
            if (meshMaterialsIds.length > 0) {
                const { rows: materials } = await queryService.invoke(new MaterialReadCollectionQuery({
                    where: [{
                        table: 'MaterialDescriptions',
                        column: 'material_client_side_uuid',
                        operator: Op.in,
                        keys: 'meshMaterialsIds',
                        value: `${meshMaterialsIds.map(c=>`'${c}'`).join(',')}`
                    }]
                }))
                meshMaterials.forEach(mm => {
                    mm.material = materials.find(m => m.client_side_uuid === mm.material_client_side_uuid)
                })
            }
            
            res.send({
                ...response,
                meshMaterials,
                ...LinkService.entityLinks(`api/v1/mesh/${client_side_uuid}`, "GET", [
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

export default router;
