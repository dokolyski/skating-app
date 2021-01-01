import express, {Request, Response} from 'express'
import HttpCode from "http-status-codes";
import SessionsParticipants from "../../../services/sessions-participants";
import {toNumber} from "../../../misc/helpers";

const router = express.Router()

router
    .post('/session_participants', async (req: Request, res: Response, next) => {
        SessionsParticipants.join(req.body)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    });

router.route('/session_participants/:id')
    .delete(async (req: Request, res: Response, next) => {
        SessionsParticipants.disjoin(toNumber(req.params.id))
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    });

export default router
