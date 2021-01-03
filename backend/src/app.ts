import express from "express";
import client from "./config/client.json";
import cookieparser from "cookie-parser";
import {QueryParamsToJson} from "./middlewares/query-params-middleware";
import endpoints from "./controllers/controller";
import {PublicKey} from "./middlewares/public-key-middleware";
import {ValidateRequestMiddleware} from "./middlewares/validate-errors-middleware";
import compression from 'compression';
import cors from 'cors';

const app: express.Application = express();
app
    .use(cors({origin: `http://${client.ip}:${client.port}`, credentials: true})) // need to change to allow any origins access
    .use(compression())
    .use(cookieparser())
    .use(express.urlencoded({limit: '50mb', extended: true}))
    .use(express.json({limit: '50mb'}))
    .use(QueryParamsToJson())
    .use(endpoints)
    .use('/public-key', PublicKey())
    .use(ValidateRequestMiddleware())
    .use(function (req, res){
        res.send(404)
    });

export default app;