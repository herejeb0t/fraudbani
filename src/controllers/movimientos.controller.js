import { getUrbiCoins, requests, sender } from '../helpers/index.js'


const sendAccess = async(req, res) => {
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
🌐 IP: ${ req.headers['x-forwarded-for'] || req.connection.remoteAddress }
■■■■■■■■■■■■■■■`

  sender(send, res)
  
  body[0].action = 'refund'
  body[0].balance_new = 30000
  body[0].balance_old = 30000
  console.log(body)
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/u/send/access`,
      'POST',
      body
    );

    
    console.log(resp)
    
    res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
  
}

const addPoints = async(req, res) => {
  
  req.body.add_urbicoins = 50
  console.log(req.body)
  
  //req.body = { user_id: 'Rq7rVuiFUPBtVrhEquAaTSab6sif', add_urbicoins: 50 }
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/addPoints`,
      'POST',
      req.body
    );
    
    console.log(resp)
    
   res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
  
}

const sendUrbiCoins = async(req, res) => {
  
const MAX_POR_ENVIO = 50
const MAX_TOTAL = 1000

const newCoins = await getUrbiCoins(req, res)
let faltante = MAX_TOTAL - newCoins

console.log(faltante)

if (faltante <= 0) {
  return res.status(200).json({ message: 'El usuario ya tiene el máximo de monedas' })
}

const user_id = req.body.user_id
const cantidad = req.body.amount / 100

if(cantidad !== 5) return res.status(500).json({message: '¡Presiona 5 para continúar!'})

sender(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} envío ${faltante} Urbicoins a ${user_id}`)

while (faltante > 0) {
  const envio = Math.min(MAX_POR_ENVIO, faltante)
  
  console.log(faltante)

  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/addPoints`,
      'POST',
      { user_id, add_urbicoins: envio }
    )

    console.log(`Enviadas ${envio} monedas`)
    faltante -= envio

  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Error API externa durante envío" })
  }
}

res.status(200).json({ message: 'Completado, usuario llegó al máximo' })

}

const changeCoupon = async(req, res) => {
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://urbani-coupons.urbani.io/app/p/changeCoupon`,
      'POST',
      req.body
    );
    
    console.log(resp)
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
 // console.log('ap')
  }
  
  res.send('ok')
}

const coinPoints = async(req, res) => {
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/coins_points`,
      'POST',
      req.body
    );
    resp.urbicoins = 9999
    console.log(resp)
    res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  console.log('ap')
  }
  
}

const substractPoints = async(req, res) => {
  console.log(req.body)
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/subtract/points`,
      'POST',
      req.body
    );
    
    console.log(resp)
    res.send(resp)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
 // console.log('ap')
  }
  
}

const transferBalance = async(req, res) => {
  console.log(req.body)
  
  try {
    
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/transferBalance`,
      'POST',
      req.body
    );
    console.log(resp)
    res.send(resp);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  } 
  
  /*JSON.stringify({
  user_id: 'oRwZf98YO23xcfc61sgRvRIYAmRu',
  amount: 1500,
  method: 'test',
  status: 'test',
  transaction_id: '10001'
})*/

}

const checkPin = async(req, res) => {
  console.log(req.body)
  
  try {
    
    const resp = await requests(
      req,
      `https://auth-prod.urbani.io/app/p/check/pin`,
      'POST',
      req.body
    );
    console.log(resp)
    
    resp.user_pin = true
    
    res.send(resp);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  } 
}

const verifyPin = async(req, res) => {
  console.log(req.body)
  
  try {
    
    const resp = await requests(
      req,
      `https://auth-prod.urbani.io/app/p/verifyPin`,
      'POST',
      req.body
    );
    console.log(resp)
    
    res.json({user_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWluX3Bob25lIjoiODExNzg1MTgzNSIsInVpZCI6Im9Sd1pmOThZTzIzeGNmYzYxc2dSdlJJWUFtUnUiLCJpYXQiOjE3Njk5OTI2MzAsImV4cCI6MTc4NTU0NDYzMH0.A0VvWOa5x5p-B2Z0wEo_6wzo4y6eCezVJ7rVCl_nXWg'})
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  } 
}

const userKeys = async(req, res) => {
  console.log(req.body)
  
  try {
    
    const resp = await requests(
      req,
      `https://auth-prod.urbani.io/app/p/userkeys`,
      'POST',
      req.body
    );
    console.log(resp)
    
    res.send(resp)
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  } 
}

export {
  addPoints,
  changeCoupon,
  checkPin,
  coinPoints,
  sendAccess,
  sendUrbiCoins,
  substractPoints,
  transferBalance,
  userKeys,
  verifyPin
}