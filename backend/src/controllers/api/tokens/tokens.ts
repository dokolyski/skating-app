import express, {Request, Response} from 'express'
import Logging from '../../../services/logging'
import HttpCode from 'http-status-codes'

const router = express.Router();

router
    .post('/tokens', async (req: Request, res: Response, next) => {
        Logging.signIn(req.body)
            .then(result => {
                res.status(HttpCode.CREATED).send(result);
            })
            .catch(e => {
                next(e)
            });
    })
    .delete('/tokens/:token', async (req: Request, res: Response) => {

    });

export default router
