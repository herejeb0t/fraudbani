import { encrypt, jwtGen, sender } from '../helpers/index.js'
import IP from '../models/ip.js'

const onDownload = async(req, res) => {
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  const encIp = encrypt(ip)
  
  const encIpExs = await IP.findOne({encIp})
  
  if(encIpExs) {
    return res.status(500).json({message: 'Termina la instalación en curso o intenta de nuevo más tarde...'})
  }
  
  await IP.create({
    encIp
  })
  
  sender(`Nueva descarga de ---> ${ ip }`)
  
  res.json({url:'https://github.com/bornredjames/Testing/releases/download/Si/APK.I.apk'})
}

export {
  onDownload
}