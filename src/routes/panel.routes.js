import{ Router } from 'express'
import { renderPanel, updateData } from '../controllers/index.js'
import { jwtVal } from '../middlewares/index.js'

const router = Router()

router.get('/', jwtVal ,renderPanel)

router.post('/recharge', jwtVal ,updateData)

export default router