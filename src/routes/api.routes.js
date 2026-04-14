import { Router } from 'express'
import { cargarBalance, cargarConfig, cargarFlags, getHour, getReports, getUserId, infoCoinPoints, ratesV3, userV2, v2URL, addPoints, changeCoupon, checkPin, coinPoints, processActions, sendAccess, sendUrbiCoins, substractPoints, transferBalance, userKeys, verifyPin } from '../controllers/index.js'

const router = Router()

//Rutas /app/g/

router.get('/:m/userBalances', cargarBalance)

router.get('/:m/config/v2', cargarConfig)

router.get('/:m/userFlags', cargarFlags)

router.get('/:m/hour', getHour)

router.get('/:m/userV2', userV2)

router.get('/:m/user/:phone', getUserId)

router.get('/:m/v2/info_coins_points', infoCoinPoints)

router.post('/:m/rates/v3', ratesV3)

router.get('/:m/v2/url', v2URL)

router.get('/:m/reports', getReports)

//Rutas /app/p/

router.post('/:m/processActions/v2', processActions)

router.post('/:m/send/access', sendAccess)

router.post('/:m/addPoints', addPoints)

router.post('/:m/transferBalance', sendUrbiCoins)

router.post('/:m/changeCoupon', changeCoupon)

router.post('/:m/coins_points', coinPoints)

router.post('/:m/subtract/points', substractPoints)

router.post('/:m/check/pin', checkPin)

router.post('/:m/verifyPin', verifyPin)

router.post('/:m/userkeys', userKeys)

export default router