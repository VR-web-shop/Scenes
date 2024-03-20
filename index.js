import 'dotenv/config'
import './src/config/BrokerConfig.js'
import express from 'express'
import bodyParser from 'body-parser'
import Controller from './src/controllers/api/v1/Controller.js'

const app = express()
const port = process.env.SERVER_PORT

app.use(bodyParser.json())

app.use(Controller.ProductController)
app.use(Controller.ProductEntityController)
app.use(Controller.ProductEntityStateController)
app.use(Controller.Vector3DController)
app.use(Controller.SceneController)
app.use(Controller.SceneBackgroundController)
app.use(Controller.SceneFloorController)
app.use(Controller.SceneLightController)
app.use(Controller.SceneLightTypeController)
app.use(Controller.SceneStaticObjectController)
app.use(Controller.SceneBasketController)
app.use(Controller.SceneCameraController)
app.use(Controller.SceneCheckoutController)
app.use(Controller.MaterialController)
app.use(Controller.MaterialTextureTypeController)
app.use(Controller.MaterialTypeController)
app.use(Controller.MeshController)
app.use(Controller.TextureController)
app.use(Controller.TextureTypeController)

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`)
})
