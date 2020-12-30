import express, {Request, Response} from 'express'
import Logging from '../../../services/logging'
import HttpCode from 'http-status-codes'

const router = express.Router();

router
    .post('/tokens', async (req: Request, res: Response, next) => {
        Logging.signIn(req.body)
            .then(result => {

                let options = {
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    httpOnly: true
                }

                res.cookie('secure-token', result.token, options)
                res.status(HttpCode.CREATED).send(result);
            })
            .catch(e => {
                next(e)
            });
    })
    .delete('/tokens/:token', async (req: Request, res: Response) => {

    });

export default router
