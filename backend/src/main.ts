import express from 'express'
import endpoints from 'controllers/controller'
import config from 'config/server.json'
import client from 'config/client.json'
import models_init from 'init/tables'
import { QueryParamsToJson } from 'middlewares/query-params-middleware'
import { PublicKey } from 'middlewares/public-key-middleware'
import cookieparser from 'cookie-parser'
import 'init/date'
import cors from 'cors'
import generateKeys from 'init/generate-keys'

(async function main() {
    await generateKeys()
    await models_init()
    
    const app: express.Application = express()
    app
        .use(cors({ origin: `http://${client.ip}:${client.port}`, credentials: true })) // need to change to allow any origins access
        .use(cookieparser())
        .use(express.urlencoded({ limit: '50mb', extended: true }))
        .use(express.json({ limit: '50mb' }))
        .use(QueryParamsToJson())
        .use(endpoints)
        .use('/public-key', PublicKey())

    app.listen(config.port, () => {
        console.log('starting server done')
    })
})()