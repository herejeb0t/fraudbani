import { Router } from 'express'
import { abrirAct, activar, renderAct } from '../controllers/activacion.controller.js'

const router = Router()

router.get('/', renderAct)

router.post('/', activar)

router.get('/:g/v2/url', abrirAct)

export default router