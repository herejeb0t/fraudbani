import { Router } from 'express'
import { check } from 'express-validator'
import { collectionVal, fieldVal } from '../middlewares/index.js'
import { getVideos, newVideo } from '../controllers/index.js'

const router = Router()
/*
router.post('/', [
  check('title', 'Título no puede estar vacío').notEmpty(),
  check('externalUrl', 'Url no puede estar vacío').notEmpty(),
  check('highlight', 'Highlight no puede estar vacío').notEmpty(),
  check('toActive', 'toActive no puede estar vacío').notEmpty(),
  check('video', 'Video no puede estar vacío').notEmpty(),
  fieldVal
], newVideo)
*/
router.get('/', [
  //collectionVal
], getVideos)

export default router