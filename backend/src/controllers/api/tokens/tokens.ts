import express, {Request, Response} from 'express'

const router = express.Router();

router
    .post('/tokens', async (req: Request, res: Response) => {
        res.send("aa");
    })
    .delete('/tokens/:token', async (req: Request, res: Response) => {

    });

export default router
