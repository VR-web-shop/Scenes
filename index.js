import 'dotenv/config'
import './src/config/WebsocketConfig.js'
import Sagas from "@vr-web-shop/sagas";
import { startHandlers } from './src/sagas/SagaHandlerCtrl.js'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Controller from './src/controllers/api/v1/Controller.js'

(async () => {
    await Sagas.BrokerService.connect()
    startHandlers()
    const app = express()
    app.use(cors({origin: '*'}))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    Object.values(Controller).forEach(controller => {
        app.use(controller.router)
    })
    app.listen(process.env.SERVER_PORT, () => console.log(`Server running on port ${process.env.SERVER_PORT}`))
})()
