import { Router } from 'express'
import { checkPinFB, loginFB, signUpFB, verifyPinFB } from '../controllers/index.js'
const router = Router()

router.post('/register', signUpFB)

router.post('/login', loginFB)

router.post('/:p/check/pin', checkPinFB)

router.post('/:p/verifyPin', verifyPinFB)

export default router