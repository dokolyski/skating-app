import express, {Request, Response} from 'express'

const router = express.Router()

router.route('/profiles')
    .get(async (req: Request, res: Response) => {

    })
    .post(async (req: Request, res: Response) => {

    })

router.route('/profiles/:id')
    .put(async (req: Request, res: Response) => {

    })
    .delete(async (req: Request, res: Response) => {

    })


export default router
