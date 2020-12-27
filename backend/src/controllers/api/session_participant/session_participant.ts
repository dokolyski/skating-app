import express, {Request, Response} from 'express'
import HttpCode from "http-status-codes";
import SessionsParticipants from "../../../services/sessions-participants";

const router = express.Router()

router
    .post('/session_participants', async (req: Request, res: Response, next) => {
        SessionsParticipants.join(req.body, req.user.id)
            .then(result => {
                res.status(HttpCode.OK).send(result);
            })
            .catch(e => {
                next(e)
            });
    })

export default router
