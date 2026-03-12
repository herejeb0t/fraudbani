import { Router } from 'express'
import { renderForm, webAuth } from '../controllers/index.js'
import { body, check } from "express-validator"
import { fieldVal } from '../middlewares/index.js'

const router = Router()

router.get('/', renderForm)

router.post('/', [
  check("main_phone", "Número no puede estar vacío!").notEmpty(),
    check("pin", "Pin no puede estar vacío!").notEmpty(),
    check("main_phone", "Número debe tener 10 dígitos").isLength({ min: 10 }),
    check("pin", "Pin debe tener 4 dígitos").isLength({ min: 4 }),
    fieldVal,
], 
webAuth)

export default router