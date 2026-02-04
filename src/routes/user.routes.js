import { Router } from 'express'
import { configV2FB, processActionsFB, ratesV3FB, sendAccessFB, userBalancesFB, userFlagsFB, userV2FB} from '../controllers/index.js'
import { auth } from '../middlewares/index.js'

const router = Router()

router.get('/:g/userBalances', auth, userBalancesFB)

router.get('/:g/userV2', auth, userV2FB)

router.get('/:g/userFlags', auth, userFlagsFB)

router.get('/:g/config/v2', auth, configV2FB)

router.post('/:g/rates/v3', auth, ratesV3FB)

router.post('/:p/processActions/v2', auth, processActionsFB)

router.post('/:u/send/access', auth, sendAccessFB)

const formatDate = (date) => {
  const pad = (n) => n.toString().padStart(2, '0')

  return (
    date.getFullYear() + '-' +
    pad(date.getMonth() + 1) + '-' +
    pad(date.getDate()) + ' ' +
    pad(date.getHours()) + ':' +
    pad(date.getMinutes()) + ':' +
    pad(date.getSeconds())
  )
}

router.get('/:g/hour', (req, res) => {
  const now = new Date()

  const promotionalDate = new Date('2027-01-01T00:00:00')

  res.json({
    current_time: formatDate(now),
    promotional_date: formatDate(promotionalDate)
  })
})

export default router