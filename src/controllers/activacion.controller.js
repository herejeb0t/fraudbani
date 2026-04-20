import IP from '../models/ip.js'
import { decrypt, encrypt } from '../helpers/index.js'

const renderAct = async(req, res) => {
  
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  console.log(ip)
  
  const encIp = encrypt(ip)
  
  const auth = req.query.user
  
  const encIpExs = await IP.findOne({encIp})
  
  const authExs = await IP.findOne({ auth })
  
  if(!req.query.user) {
    return res.render('activador.hbs', { adv: 'Error, petición sin token!', advIcon: 'warningRedIcon', Avalue: 'Inicio', href: '/' })
  }
  console.log(auth)
  
  if( authExs ) {
    if(authExs.auth == auth) {
    return res.status(500).render('activador.hbs',{adv: `Usuario ya fué activado, instala el Apk II.`, advIcon: 'warningRedIcon', Avalue: 'Descargar', href: 'https://github.com/bornredjames/Testing/releases/download/Si/com.miruta.mty.v3.0.3_antisplit_sign.apk'})
  }
  }
  
  if(!encIpExs) {
    return res.status(500).render('activador.hbs', { adv: `Descarga el APK I desde la página principal, recuerda que si alguien te vendió o intentó vender ésta apk fuiste estafado.`, advIcon: 'warningRedIcon', Avalue: 'Página principal', href: '/'})
  }
  
  encIpExs.encIp = null
  encIpExs.auth = req.query.user
  
  console.log(auth)
  console.log(authExs)
  
  await encIpExs.save()
  
  res.render('activador.hbs', { adv: `Activado, esta APK es Gratuita si te la están vendiendo o intentando vender estás siendo estafado.`, advIcon: 'icon_profile_modal_confirm_code', Avalue: 'Página principal', href: '/'})
}

const abrirAct = (req, res) => {
  res.json({ URL_FB: `http://localhost:4000/act/app?user=${req.headers.authorization}` })
}

const activar = async(req, res) => {
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  console.log(ip)
  
  const encIp = encrypt(ip)
  
  const encIpExs = await IP.findOne({encIp})
  
  if(!encIpExs) {
    return res.status(500).json({message: `Descarga el apk desde:
    
https://fraudbani-fyfr.onrender.com

Apk gratuito, si pagaste por el fuiste estafad@ 😒

Fraudbani por:
Skr0to`})
}
   
  encIpExs.encIp = null
  encIpExs.auth = req.query.user
  
  await encIpExs.save()
  
  res.json({message: 'Activado c:'})

}


export {
  abrirAct,
  activar,
  renderAct
}