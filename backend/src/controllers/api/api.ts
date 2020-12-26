import express from 'express'
import notificationsRoute from './notifications/notifications'
import profilesRoute from './profiles/profiles'
import sessionParticipantRoute from './session_participant/session_participant'
import sessionsRoute from './sessions/sessions'
import tokensRoute from './tokens/tokens'
import usersRoute from './users/users'
import {TokenMiddleware} from "../../middlewares/token-middleware";

const router = express.Router()

router.use('/api/', tokensRoute, usersRoute)
router.use('/api/', TokenMiddleware(), notificationsRoute, profilesRoute, sessionParticipantRoute, sessionsRoute, tokensRoute)


export default router
