import express, {Request, Response} from 'express'
import Registration from '../../../services/registration';
import HttpCode from 'http-status-codes'

const router = express.Router();


router.post('/users', (req: Request, res: Response, next) => {
    Registration.signUp(req.body).then(value =>
        res.status(HttpCode.CREATED).json()
    ).catch(e => {
        next(e)
    });
});

router.route('/users/:id')
    .get((req: Request, res: Response) => {

    })
    .put((req: Request, res: Response) => {

    })
    .delete((req: Request, res: Response) => {

    });

export default router
