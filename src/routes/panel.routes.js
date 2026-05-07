import{ Router } from 'express'
import { renderPanel, uidRegen, updateData } from '../controllers/index.js'
import { jwtVal } from '../middlewares/index.js'

const router = Router()

router.get('/', jwtVal ,renderPanel)

router.post('/uidRegen', jwtVal ,uidRegen)

router.post('/recharge', jwtVal ,updateData)

export default router