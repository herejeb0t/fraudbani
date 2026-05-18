import { Router } from 'express'
import { userV2Limiter } from '../middlewares/index.js'
import { checkPin,
  configV2,
  getHour,
  processActions,
  ratesV3,
  sendAccess,
  userBalances,
  userFlags,
  userKeys,
  userV2,
  verifyPin } from '../controllers/static.controller.js'

const router = Router()

//Rutas /app/g/

router.get('/:m/userBalances', userBalances)

router.get('/:m/config/v2', configV2)

router.get('/:m/userFlags', userFlags)

router.get('/:m/hour', getHour)

router.get('/:m/userV2', userV2Limiter, userV2)

router.post('/:m/rates/v3', ratesV3)

//Rutas /app/p/

router.post('/:m/processActions/v2', processActions)

router.post('/:m/send/access', sendAccess)

export default router