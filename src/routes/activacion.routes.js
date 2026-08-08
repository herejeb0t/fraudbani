import { Router } from 'express'
import { renderAct } from '../controllers/index.js'

const router = Router()

router.get('/', renderAct)

export default router