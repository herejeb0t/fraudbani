import { Router } from 'express'
import { addPoints, changeCoupon, checkPin, coinPoints, processActions, sendAccess, sendUrbiCoins, substractPoints, transferBalance, userKeys, verifyPin } from '../controllers/index.js'

const router = Router()

router.post('/processActions/v2', processActions)

router.post('/send/access', sendAccess)

router.post('/addPoints', addPoints)

router.post('/transferBalance', sendUrbiCoins)

router.post('/changeCoupon', changeCoupon)

router.post('/coins_points', coinPoints)

router.post('/subtract/points', substractPoints)

router.post('/check/pin', checkPin)

router.post('/verifyPin', verifyPin)

router.post('/userkeys', userKeys)

export default router