import express, {Request, Response} from 'express'
import Notifications from "../../../services/notifications";
import HttpCode from "http-status-codes";
import {toNumber} from "../../../misc/helpers";

const router = express.Router()

router.route('/notifications')
    .get(async (req: Request, res: Response, next) => {
        Notifications.index(req.body)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e);
            });
    })
    .post(async (req: Request, res: Response, next) => {
        Notifications.create(req.body)
            .then(result => {
                res.status(HttpCode.NO_CONTENT).send(result);
            })
            .catch(e => {
                next(e);
            });
    })

router
    .patch('/notifications/:id/status', async (req: Request, res: Response, next) => {
        Notifications.editStatus(toNumber(req.params.id), req.body)
            .then(result => {
                res.status(HttpCode.NO_CONTENT).send(result);
            })
            .catch(e => {
                next(e);
            });
    })

export default router
