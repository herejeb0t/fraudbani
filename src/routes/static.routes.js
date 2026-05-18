import { Router } from 'express'
import { checkPin, configV2, getHour, processActions, ratesV3, sendAccess, userBalances, userFlags, userKeys, userV2, verifyPin} from '../controllers/static.controller.js'

const router = Router()

//router.post('/:param/:p/check/pin', checkPin)

//router.post('/:param/:p/verifyPin', verifyPin)

router.get('/:param/:g/userBalances',  userBalances)

router.get('/:param/:g/userV2',  userV2)

router.get('/:param/:g/userFlags',  userFlags)

router.get('/:param/:g/config/v2',  configV2)

router.get('/:param/:g/hour', getHour)

router.post('/:param/:g/rates/v3',  ratesV3)

router.post('/:param/:p/processActions/v2',  processActions)

router.post('/:param/:u/send/access',  sendAccess)

router.get('/:param/:g/config', configV2)

router.get('/:param/:g/user', userV2)

router.post('/:param/:p/userkeys', userKeys)

export default router