import { Router } from 'express'
import { getUCinfo, ucSender } from '../controllers/index.js'
import { fieldVal } from '../middlewares/index.js'
import { body, check } from 'express-validator'

const router = Router()

//router.get('/')

//router.get('/getuc',
/*
[
  check('phone', 'Ponga algo, pendejo!').notEmpty(),
  check('phone', 'Debe tener más de 10 carácteres').isLength({ min: 10 }),
  fieldVal
  ] ,
  */
  //getUCinfo)
  
  router.get('/send', ucSender)

export default router