import express, {Request, Response} from 'express'
import Profiles from "../../../services/profiles";
import HttpCode from "http-status-codes";

const router = express.Router()

router.route('/profiles')
    .get(async (req: Request, res: Response, next) => {
        Profiles.index(req.query.userId)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })
    .post(async (req: Request, res: Response, next) => {
        Profiles.create(req.body, req.user.id)
            .then(result => {
                res.status(HttpCode.CREATED).send(result);
            })
            .catch(e => {
                next(e)
            });
    })

router.route('/profiles/:id')
    .get(async (req: Request, res: Response, next) => {
        Profiles.get(req.params.id)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })
    .put(async (req: Request, res: Response, next) => {
        Profiles.edit(req.params.id, req.body)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })
    .delete(async (req: Request, res: Response, next) => {
        Profiles.delete(req.params.id)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })


export default router
