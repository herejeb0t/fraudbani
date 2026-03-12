import { Router } from 'express'
import { getEvents } from '../controllers/index.js'

const router = Router()

router.get('/', getEvents)

export default router