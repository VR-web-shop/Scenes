import 'dotenv/config'
import meteor from "@vr-web-shop/meteor";
import Controller from "./src/controllers/api/v1/Controller.js";
import fs from 'fs';

const path = './sdk/api.json'
const { SERVER_HOST, SERVER_PORT } = process.env
const json = []
for (let key of Object.keys(Controller)) {
    const controller = Controller[key]
    const url = `${SERVER_HOST}:${SERVER_PORT}`
    const api = controller.generateCrudAPI(url)    
    const data = meteor.CrudAPI.toJson(api)
    
    json.push({ [key]: data })
}
console.log(json)
fs.writeFileSync(path, JSON.stringify(json, null, 4))
