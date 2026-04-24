import { Router } from 'express'
import { abrirAct64, renderAct64 } from '../controllers/index.js'

const router = Router()

router.get('/', renderAct64)

router.get('/:g/v2/url', abrirAct64)

export default router