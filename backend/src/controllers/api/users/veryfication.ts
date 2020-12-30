import express, {Request, Response} from 'express'
import Registration from '../../../services/registration';
import HttpCode from 'http-status-codes'
import Users from "../../../services/users";
import ForbiddenException from "../../../misc/forbidden-exception";

const router = express.Router();


router.post('/users', (req: Request, res: Response, next) => {
    Registration.signUp(req.body).then(() =>
        res.status(HttpCode.CREATED).json()
    ).catch(e => {
        next(e)
    });
});

export default router
