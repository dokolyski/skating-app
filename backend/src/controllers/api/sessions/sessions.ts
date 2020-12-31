import express, {Request, Response} from 'express'
import Sessions from "../../../services/sessions";
import HttpCode from "http-status-codes";
import {toNumber} from "../../../misc/helpers";

const router = express.Router()

router.route('/sessions')
    .get(async (req: Request, res: Response, next) => {
        Sessions.index(req.body)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })
    .post(async (req: Request, res: Response, next) => {
        Sessions.create(req.body)
            .then(result => {
                res.status(HttpCode.CREATED).send(result);
            })
            .catch(e => {
                next(e)
            });
    })

router.route('/sessions/:id')
    .get(async (req: Request, res: Response, next) => {
        Sessions.get(toNumber(req.params.id))
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })
    .put(async (req: Request, res: Response, next) => {
        Sessions.edit(toNumber(req.params.id), req.body)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e);
            });
    })
    .delete(async (req: Request, res: Response, next) => {
        Sessions.delete(toNumber(req.params.id))
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })

router
    .patch('/sessions/:id/status', async (req: Request, res: Response, next) => {
        Sessions.editStatus(toNumber(req.params.id), req.body)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })


export default router
