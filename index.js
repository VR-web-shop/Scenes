import 'dotenv/config'
import './src/config/BrokerConfig.js'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import Controller from './src/controllers/api/v1/Controller.js'
import StorageController from './src/controllers/api/v1/StorageController.js'
const app = express()
const port = process.env.SERVER_PORT

app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().array())
app.use(StorageController)
Object.values(Controller).forEach(controller => {
    app.use(controller.router)
})

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`)
});
