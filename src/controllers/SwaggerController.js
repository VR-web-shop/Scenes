/**
 * @module controllers/api/SwaggerController
 * @description A module that provides the Swagger API documentation
 * @requires module:express
 * @requires module:swagger-ui-express
 * @requires module:swagger-jsdoc
 * @requires module:path
 */
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dir from 'path';
import express from 'express';

const __dirname = dir.resolve();
const router = express.Router()
let url = process.env.DEV_SERVER_URL
if (process.env.NODE_ENV === 'production') {
    url = process.env.PROD_SERVER_URL
}
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Scenes API',
            description: "API endpoints for scenes management.",
            contact: {
                name: "GitHub Repository",
                url: "https://github.com/VR-web-shop/Scenes"
            },
            version: '1.0.0',
        },
        servers: [
            {
                url,
                description: "Server"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        }
    },
    apis: [`${__dirname}/src/controllers/api/v1/*.js`]
}

const swaggerDocument = swaggerJsdoc(options);
router.use('/api/v1/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
