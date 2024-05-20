import LinkService from '../../../services/LinkService.js';
import APIActorError from '../errors/APIActorError.js';
import ModelQueryService from '../../../services/ModelQueryService.js';
import ReadOneQuery from '../../../queries/Product/ReadOneElasticQuery.js';
import ReadCollectionQuery from '../../../queries/Product/ReadCollectionElasticQuery.js';
import ReadCollectionMysqlQuery from '../../../queries/Product/ReadCollectionQuery.js';
import PEReadCollectionMysqlQuery from '../../../queries/ProductEntity/ReadCollectionQuery.js';
import { Op } from 'sequelize';
import rollbar from '../../../../rollbar.js';
import express from 'express';

const router = express.Router();
const queryService = new ModelQueryService();

router.route('/api/v1/products')
    /**
     * @openapi
     * '/api/v1/products':
     *  get:
     *     tags:
     *       - Product Controller
     *     summary: Fetch all products
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
     *               description:
     *                type: string
     *               price:
     *                type: number
     *               thumbnail_source:
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
            const { rows, count, pages } = await queryService.invoke(new ReadCollectionMysqlQuery({limit, page,
                include: [{
                    table: 'ProductEntities',

                }]
            }))
            const { rows: entities } = await queryService.invoke(new PEReadCollectionMysqlQuery({
                limit: 1000,
                where: [{
                    table: 'ProductEntityDescriptions',
                    column: 'product_client_side_uuid',
                    operator: Op.in,
                    keys: 'client_side_uuids',
                    value: `${rows.map(r=>`'${r.client_side_uuid}'`).join(',')}`
                }]
            }))
            rows.forEach(row => {
                row.product_entities = entities.filter(e => e.product_client_side_uuid === row.client_side_uuid)
            })
            res.send({ 
                rows, 
                count, 
                pages,
                ...LinkService.paginateLinks(`api/v1/products`, parseInt(page), pages),
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
router.route('/api/v1/product/:client_side_uuid')
    /**
     * @openapi
     * '/api/v1/product/{client_side_uuid}':
     *  get:
     *     tags:
     *       - Product Controller
     *     summary: Fetch a single product
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
     *                 type: string
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *               price:
     *                 type: number
     *               thumbnail_source:
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
    .get(async (req, res) => {
        try {
            const { client_side_uuid } = req.params
            const response = await queryService.invoke(new ReadOneQuery(client_side_uuid))
            res.send({
                ...response,
                ...LinkService.entityLinks(`api/v1/product/${client_side_uuid}`, "GET", [
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
router.route('/api/v1/products/batch')
    /**
     * @openapi
     * '/api/v1/products/batch':
     *  post:
     *     tags:
     *       - Vector3D Controller
     *     summary: Fetch a batch of products by client_side_uuids
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
     *       description: OK
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
                    table: 'Products',
                    column: 'client_side_uuid',
                    operator: Op.in,
                    keys: 'client_side_uuids',
                    value: `${client_side_uuids.map(c=>`'${c}'`).join(',')}`
                }]
            }))
            res.send({
                rows,
                count,
                ...LinkService.entityLinks(`/api/v1/products/batch`, 'POST', []),
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
