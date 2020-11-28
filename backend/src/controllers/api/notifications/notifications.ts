import express, {Request, Response} from 'express'

const router = express.Router()

router.route('/notifications')
    .get(async (req: Request, res: Response) => {

    })
    .post(async (req: Request, res: Response) => {

    })

router
    .patch('/notifications/:id/status', async (req: Request, res: Response) => {

    })

export default router
