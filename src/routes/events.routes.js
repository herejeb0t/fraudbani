import { Router } from 'express'
import { getEvents, getVideos, newEvent } from '../controllers/index.js'
import { check } from 'express-validator'
import { collectionVal, fieldVal } from '../middlewares/index.js'

const router = Router()

router.post('/event', [
  check('title', 'Título no puede estar vacío').notEmpty(),
  check('description', 'Descripción no puede estar vacío').notEmpty(),
  check('detailedDescription', 'Descripción detallada no puede estar vacío').notEmpty(),
  check('file_name', 'Nombre de archivo no puede estar vacío').notEmpty(),
  check('fin', 'Fin no puede estar vacío').notEmpty(),
  check('inicio', 'Inicio no puede estar vacío').notEmpty(),
  check('key', 'Imagen src no puede estar vacío').notEmpty(),
  check('location', 'Ubicación no puede estar vacío').notEmpty(),
  check('mime_type', 'mime_type no puede estar vacío').notEmpty(),
  check('nameCategory', 'Categoria no puede estar vacío').notEmpty(),
  fieldVal
],
            newEvent)

router.get('/', getEvents)

//router.get('/videos', getVideos)

export default router