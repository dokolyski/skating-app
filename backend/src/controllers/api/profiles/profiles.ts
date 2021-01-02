import express, {Request, Response} from 'express'
import Profiles from "../../../services/profiles";
import HttpCode from "http-status-codes";
import {toNumber} from "../../../misc/helpers";

const router = express.Router()

router.route('/profiles')
    .get(async (req: Request, res: Response, next) => {
        Profiles.index(req.body)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })
    .post(async (req: Request, res: Response, next) => {
        Profiles.create(req.body)
            .then(result => {
                res.status(HttpCode.CREATED).send(result);
            })
            .catch(e => {
                next(e)
            });
    })

router.route('/profiles/:id')
    .get(async (req: Request, res: Response, next) => {
        Profiles.get(toNumber(req.params.id))
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })
    .put(async (req: Request, res: Response, next) => {
        Profiles.edit(toNumber(req.params.id), req.body)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })
    .delete(async (req: Request, res: Response, next) => {
        Profiles.delete(toNumber(req.params.id))
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })


export default router
