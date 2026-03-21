import { Router } from 'express'
import { getVideos } from '../controllers/index.js'

const router = Router()

router.get('/', getVideos)

export default router