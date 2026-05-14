import IP from '../models/ip.js'
import { decrypt, encrypt, sender } from '../helpers/index.js'

const renderBal = async(req, res) => {
  try {
  
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
  
  console.log(ip)
  
  const encIp = encrypt(ip)
  
  const auth = req.query.user
  
  const authExs = await IP.findOne({ auth })
  
  if(!req.query.user) {
    return res.render('items.hbs', { adv: 'Error, petición sin Usuario!', advIcon: 'warningRedIcon', Avalue: 'Inicio', href: '/' })
  }
  console.log(auth)
  
  if( !authExs ) {
     return res.status(500).render('items.hbs',{adv: `Usuario invalido.`, advIcon: 'warningIcon', Avalue: 'Inicio', href: '/'})
  }
  
  let balance = 300
  let freeTrip = 0
  let isChecked
  let isRanUsr
  
  if (authExs.balance) balance = authExs.balance / 100
  
  if (authExs.points) freeTrip = authExs.points
  
  if (authExs.Settings.autoRegen) isChecked = 'checked'
  
  if (authExs.Settings.ranUsr) isRanUsr = 'checked'
  
  res.render('items.hbs', { form: true, balance, freeTrip, auth, isChecked, isRanUsr })

} catch(err) {
  res.json({ message: err })
}
}


const updateItems = async (req, res) => {
  try {
    const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
    const ip = raw.split(',')[0].trim()

    const auth = req.query.user

    const { balance, freeTrip, atRg, raUs } = req.body
    
    let autoRegen
    
    let ranUsr
    
    if (!auth) {
      return res.json({message: 'Falta usuario!'})
    }
    
    if (balance > 9999) {
      return res.status(500).json({message: 'Error!'})
    }
    
   atRg ? autoRegen = true : autoRegen = false
   
   raUs ? ranUsr = true : ranUsr = false

    await IP.updateOne(
      { auth },
      {
        balance: balance * 100,
        points: freeTrip,
        Settings: {
          autoRegen,
          ranUsr
        }
      }
    )
    
    sender(`${auth} cambió sus items a $ ${balance} y 🎫 ${freeTrip}
From: ${ip}`)

    res.redirect(`/items?user=${auth}`)

  } catch (err) {
    res.status(500).json({ message: 'Error del servidor', error: err.message })
  }
}


export {
  renderBal,
  updateItems
}