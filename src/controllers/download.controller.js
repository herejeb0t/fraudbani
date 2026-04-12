import { encrypt, jwtGen } from '../helpers/index.js'
import IP from '../models/ip.js'

const onDownload = async(req, res) => {
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  const encIp = encrypt(ip)
  
  const encIpExs = await IP.findOne({encIp})
  
  if(encIpExs) {
    return res.json({message: 'Error, intenta más tarde...'})
  }
  
  await IP.create({
    encIp
  })
  
  res.redirect('/')
}

export {
  onDownload
}