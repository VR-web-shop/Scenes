import 'dotenv/config'
import './src/config/WebsocketConfig.js'
import './src/sagas/SagaHandlerCtrl.js'

import Sagas from "@vr-web-shop/sagas";

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Controller from './src/controllers/api/v1/Controller.js'

const port = process.env.SERVER_PORT
const origin = process.env.CORS_ORIGINS.split(',')

(async () => {
    await Sagas.BrokerService.connect()
    const app = express()
    app.use(cors({
        origin,
        credentials: true
    }));
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    Object.values(Controller).forEach(controller => {
        app.use(controller.router)
    })
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})()
