import { getUrbiCoins, requests } from '../helpers/index.js'

const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWluX3Bob25lIjoiODEzNjk1Mzk3OSIsInVpZCI6ImkyaWhXS3lMYlRlOFNyUFV2bTV5Q0RNeGFmeEkiLCJpYXQiOjE3Njg5NjUzOTAsImV4cCI6MTc4NDUxNzM5MH0.sLYUvyNYsPLp9NxWgE2CoxUuzatrrKM44mqi8-ZRWeA'

const getUID = async(req, res) => {
  const { phone } = req.query
  
  if(!phone) return res.json({message: 'Falta número!'})
  
  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/g/user/${phone}`,
      'GET',
      null,
      authorization
    );
    
    if(resp.name == undefined) return undefined
    
    /*resp.name = `${resp.name} | OJO 👀 son Urbicoins, no saldo jksjsks, presiona 5 para continúar.`
    user_id = resp.user_id
    console.log(resp)

    resp.first_last_name = ''
    resp.second_last_name = ''*/
    console.log(resp)
    return resp
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
}

const getUCinfo = async(req, res) => {
  const userInfo = await getUID(req)
  
  if(!userInfo) return res.json({message: 'Usuario no existe!'})
  
const user_id = userInfo.user_id
const name = userInfo.name
const first_last_name = userInfo.first_last_name
const second_last_name = userInfo.second_last_name
  
const MAX_TOTAL = 1000

const newCoins = await getUrbiCoins(req, res, authorization, user_id)

if(newCoins == undefined) return res.json({message: "No se puede enviar a este usuario!"})

let faltante = MAX_TOTAL - newCoins
console.log(newCoins)
res.json({ user_id,name, first_last_name, second_last_name, newCoins, faltante })

//return { user_id, newCoins }
}

const ucSender = async(req, res) => {
  const MAX_POR_ENVIO = 50
  const MAX_TOTAL = 1000
  
  const uid = req.query.uid
  let cantidad = req.query.amount || req.query.faltante || 600
  
  /*const userInfo = await getUID(req)
  
  if(!userInfo.user_id) return res.json({message: 'Usuario no existe!'})
  
req.body.user_id = userInfo.user_id
*/
  

/*const newCoins = await getUrbiCoins(req, res, authorization)
  let faltante = MAX_TOTAL - newCoins
*/
//if (req.query.amount) cantidad = req.query.amount

//console.log(faltante)

if (cantidad <= 0) {
  return res.status(200).json({ message: 'El usuario ya tiene el máximo de monedas' })
}

const user_id = uid

while (cantidad > 0) {
  const envio = Math.min(MAX_POR_ENVIO, cantidad)

console.log(cantidad)

  try {
    const resp = await requests(
      req,
      `https://app.urbani.io/app/p/addPoints`,
      'POST',
      { user_id, add_urbicoins: envio },
      authorization
    )

    console.log(`Enviadas ${envio} monedas`)
    cantidad -= envio

  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Error API externa durante envío" })
  }
}

res.status(200).json({ message: 'Completado, usuario llegó al máximo' })

}

export {
  getUCinfo,
  ucSender,
}