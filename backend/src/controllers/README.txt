W tym folderze tworzymy katalogi zgodnie z budową URI danego endpointa, w danym folderze zaczynając od folderu "controller" tworzymy plik o takiej samej nazwie. W każdym z takich plików znajduje się router, który zawiera definicje danego endpointa (router.route('/[NAZWA ENDPOINTA]').[METODA]([MIDDLEWARE KONCOWY]) ) oraz wykorzystuje inne routery jako middleware ( router.use('/[ENDPOINT]', [PO PRZECINKU UMIESZCZAMY ROUTERY W DALSZYCH URI W TYCH FOLDERACH PODRZĘDNYCH]) )

Jeśli nie ma danego URI to użytkownik otrzyma 404.

Na przykład:

import express, { Request, Response } from 'express'
import verifyRoute from './verify/verify'
import HttpCode from 'http-status-codes'
import { signUp } from'services/registration'

const router = express.Router()

// sign up
router.route('/register')
.post(async (req: Request, res: Response) => {
    let err = await signUp(req.body)
    if(!err) {
        res.sendStatus(HttpCode.CREATED)
    } else {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err instanceof Error ? err.message : 'cannot sign up')
    }
})

router.use('/register', verifyRoute)

export default router