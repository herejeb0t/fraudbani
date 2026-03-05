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
  try {
    /*
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/hour`,
      'GET',
      null
    );*/
    const fecha = new Date().toLocaleString("sv-SE", {
    timeZone: "America/Monterrey"
}).replace("T"," ");

    
    //constcurrent_time = fecha
    const promotional_date = '2027-01-01 00:00:00'
    
    //console.log(resp)
    
    res.json({
      current_time: fecha,
      promotional_date
    })
    
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Error" });
  }
})

export default router