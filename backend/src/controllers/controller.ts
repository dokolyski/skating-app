import express from 'express'
import apiRoute from './api/api'

const router = express.Router()
router.use('/', apiRoute)

export default router
