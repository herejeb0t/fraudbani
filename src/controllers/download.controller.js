import { jwtGen } from '../helpers/index.js'
import IP from '../models/ip.js'

const onDownload = async(req, res) => {
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  const token = await jwtGen(ip, '10m', process.env.ipKEY)
  
  await IP.create({
    token
  })
  
  res.json({token})
}

export {
  onDownload
}