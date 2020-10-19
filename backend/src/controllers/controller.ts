import express from 'express'
import tournamentRoute from './tournament/tournament'
import userRoute from './user/user'

const router = express.Router()
router.use('/', /*TU UMIEŚCIĆ ROUTERY ZA TĄ ŚCIEŻKĄ*/)

export default router