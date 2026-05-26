import { Router } from 'express'
import { getUsers } from '../controllers/index.js'
import { admRole, hvaRole, jwtVal } from '../middlewares/index.js'

const router = Router()

router.get('/users', [
  jwtVal,
  //hvaRole,
  admRole
  ], getUsers)

export default router