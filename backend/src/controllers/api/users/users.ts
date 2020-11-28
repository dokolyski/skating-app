import express, {Request, Response} from 'express'

const router = express.Router()

router.post('/users', async (req: Request, res: Response) => {

})

router.route('/users/:id')
    .get(async (req: Request, res: Response) => {

    })
    .put(async (req: Request, res: Response) => {

    })
    .delete(async (req: Request, res: Response) => {

    })

export default router
