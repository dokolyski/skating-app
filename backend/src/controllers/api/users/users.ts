import express, {Request, Response} from 'express'
import Registration from '../../../services/registration';
import HttpCode from 'http-status-codes'
import Users from "../../../services/users";
import ForbiddenException from "../../../misc/forbidden-exception";

const router = express.Router();

router.route('/users/:id')
    .get((req: Request, res: Response, next) => {
        Users.get(req.params.id).then(value =>
            res.status(HttpCode.OK).json(value)
        ).catch(e => {
            next(e)
        });
    })
    .put((req: Request, res: Response, next) => {

        Users.edit(req.params.id, req.body).then(value =>
            res.status(HttpCode.OK).json()
        ).catch(e => {
            next(e)
        });
    })
    .delete((req: Request, res: Response, next) => {

        Users.delete(req.params.id).then(value =>
            res.status(HttpCode.OK).json()
        ).catch(e => {
            next(e)
        });
    });

export default router
