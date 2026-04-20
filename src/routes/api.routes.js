import { Router } from 'express'
import { checkPin,
  configV2,
  getHour,
  processActions,
  ratesV3,
  sendAccess,
  userBalances,
  userFlags,
  userKeys,
  verifyPin } from '../controllers/static.controller.js'

const router = Router()

//Rutas /app/g/

router.get('/:m/userBalances', userBalances)

router.get('/:m/config/v2', configV2)

router.get('/:m/userFlags', userFlags)

router.get('/:m/hour', getHour)

router.post('/:m/rates/v3', ratesV3)

//Rutas /app/p/

router.post('/:m/processActions/v2', processActions)

router.post('/:m/send/access', sendAccess)

router.post('/:m/check/pin', checkPin)

router.post('/:m/verifyPin', verifyPin)

export default router