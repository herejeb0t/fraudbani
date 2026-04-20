import { Router } from 'express'
import { abrirAct, renderAct } from '../controllers/activacion.controller.js'

const router = Router()

router.get('/', renderAct)

router.get('/:g/v2/url', abrirAct)

export default router