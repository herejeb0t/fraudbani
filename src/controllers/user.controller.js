import User from '../models/user.js'
import Transaction from '../models/transactions.js'
import { auth } from '../middlewares/index.js'
import { encrypt } from '../helpers/index.js'

// GET /app/g/userV2
const userV2FB = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.user.user_id })
      .select('-_id -__v -pin_hash') 

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor'+err })
  }
}

const userFlagsFB = (req, res) => {
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

const configV2FB = (req, res) => {
  const encCfV2 = encrypt('[{"id":1,"app_version":"2.2.12","force_update":true,"skey":"iRdF#2G","skey_m":"!z%C&F)","subway_price":"8.80","allowrooteddevices":true,"assistence_url":"https://assistence-qr-app.urbani.io","assistence_type":"0","bins_version":"1.0","exp_m":"900","exp_t":"900","exp_r":"900","exp_e":"3600","transfer":"500","spei":"3000","card":"500","oxxo":"500","always_update_balance":true,"mv2":true,"dms":"300","ch_status":false,"m_spei_ch":"10000","skey_avante":"cH$0i1p","coins_amount":null,"swap_dsc_name":true,"skey_campeche":"c4M#0$x","skey_express_private":"rP#i2*w$!","paymentOnline":false,"traOffline":false,"ticketDiscount":true,"campRA":true,"campRM":true,"cmpPref":null,"nlPref":null}]')
  
  res.send(encCfV2)
}

const userBalancesFB = async(req, res) => {
  try {
    const user = await User.findOne({ user_id: req.user.user_id })

    const balanceData = {
      balance: String(user.balance),   // 👈 como string
      coins: String(user.coins || 0),
      points: String(user.points || 0),
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

const ratesV3FB = (req, res) => {
 /* const rates = encrypt('[{"rate_type":"ORDINARIA","transport_type":"TRANSMETRO","price":"1500","price_id":"6786"},{"rate_type":"ORDINARIA","transport_type":"ECOVIA","price":"1500","price_id":"6738"},{"rate_type":"ORDINARIA","transport_type":"RUTA_EXPRESS_MORADO","price":"1500","price_id":"2703"},{"rate_type":"ORDINARIA","transport_type":"RUTA_GUINDA","price":"1200","price_id":"1260"},{"rate_type":"ORDINARIA","transport_type":"RUTA_AMARILLA","price":"800","price_id":"8040"},{"rate_type":"ORDINARIA","transport_type":"RUTA_MORADA","price":"800","price_id":"8041"},{"rate_type":"ORDINARIA","transport_type":"RUTA_INTEGRADA","price":"1500","price_id":"1515"},{"rate_type":"ORDINARIA","transport_type":"RUTA_AVANTE","price":"1000","price_id":"6771"},{"rate_type":"ORDINARIA","transport_type":"METRO","price":"990","price_id":"6767"},{"rate_type":"ORDINARIA","transport_type":"RUTA_EXPRESS","price":"1660","price_id":"6773"}]')*/
  
  res.send("7przXlz9YjPH1UW3No38YEvWYqoaJIbUiCGBXlaRLuO67wXONZugKCHCBksNsCqhNK8B01z8EEQfs4pYt3l82PAOC7XioRNXSGaEugHUTskGoDuzjcNbxXxrzHs7xUFf77Su2d0YJthXGrHIHXokpY1reFGf5LuoQmU3LkFa5sLGICwycyyF5tazUaW58l0wMROJDH1gvl+BxLCrXrg/Vwdtz2nbwRtrwhiHJDNZ6cJ1st2ilFB9zC4P2T9U4MePWc46zxsUnypEubg/jqgpsqPvKo+XXPbma9DWIwS/fxd4tx0YLs8CjF8cSwZK57a8f9lGXfW41y3E9YW9Jvrd9SVOaZPMqIG8puhQulbhjS+m7iGrYbTraoz/O0BIBN5EGCO9axzPcbzD/VEnnEuN/xUQUFi1ZCNnue64TZQrp8NZp4Qxpsz+tnTELvuvAN+zui0hE50zJOGhGPasDch4ioUhBueX6A2QbndOTOAoLZN5qQN+QWummobuqWoL0TDD7KsoTUp7Vs4wxbVRcdxKmV49piPY8/rjCAO8yAac7v4BLXUWngEg45nzfAiJ8VXRpRmXYVT9bLdWNs/v4LswboMaVTjGQb2jNrNCsoZnm+/KG8O/MUCZgHEjPdx2C0YT4jiE6kadddneSgifA6Z9iKD6/cp7IobDoc+6v+MrzTE2OaRyVUsaS9yAecz7vkoYIs5AYKTRY9j5qYBBj1eWJpV7GH72OG5e6ZMahlq2jf1ZGbl3+dtmpEedWIejmtZLCVGQBnhynbfwzgB0//ZMmEcF5itrv5an2bD969NMVzt0rt8gHINNzlbGAQ6jbyRe6KpcaJ8wQ6Ue1BQ9Gtp+0+knFzgnFwABPo71UAVoxRqK9RlKPo8IVXxhB1SzQzPBSOlQnObzNZB1n2f9idgjmdeNYMpKGzgDTMsHrEDldu2fWHlR4qoDwlft2ySjO2BGYIvrhm1Cl3p+EQqdIwlHbR+Ry/zBAO4M7btGGw+X56AEF7EWLegRjCLk00ZflAE1sZYdy+08ucmtXmGxLzcQ7ICfaVSvE6dV3o7aYAi3Va68Jorcszh4vPPwfHC+53UQIJfJNVBy9D4yQFdOwMwpiUB0SZ1C/cXqRfLED1u+Xby4t8IvWnY7pZo273NGfGbu1KwsoYQunyCa0vhjKhwpV96EPyraMgscIXr0ZmSGCMdK1xFAlJBjgdsYnv+1D7CH")
}

const processActionsFB = async (req, res) => {
  try {
    console.log("req.body -->", JSON.stringify(req.body))

    const { transactions } = req.body
    if (!transactions || !Array.isArray(transactions)) {
      return res.status(400).json({ message: "Formato inválido" })
    }

    const user = await User.findOne({ user_id: req.user.user_id })

    for (const tx of transactions) {
      const access = tx.access

      await Transaction.create({
        user: user._id,
        type: tx.action, // "charge" o "refund"
        amount: Math.round((access.total || 0) * 100),
        previous_balance: user.balance,
        new_balance: user.balance, // aquí no modificamos aún
        transport_type: access.transport_type,
        branch: access.branch,
        code_id: access.code_id,
        price_id: access.price_id,
        passengers: access.passengers,
        subtotal: access.subtotal,
        discount: access.discount,
        total: access.total,
        access_date: new Date(access.access_date),
        client_uid: access.uid
      })
    }

    res.json({ message: "Datos enviados", length: transactions.length })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error del servidor" })
  }
}

const sendAccessFB = async (req, res) => {
  try {
    console.log("req.body -->", JSON.stringify(req.body))

    const user = await User.findOne({ user_id: req.user.user_id })

    let totalCharged = 0
    let refunds = 0

    for (const access of req.body) {
      const cost = Math.round((access.total || 0) * 100)

      if (cost > 0) {
        if (user.balance < cost) continue // saldo insuficiente

        const previous = user.balance
        const newBalance = previous - cost

        user.balance = newBalance
        totalCharged++

        await Transaction.create({
          user: user._id,
          type: "charge",
          amount: cost,
          previous_balance: previous,
          new_balance: newBalance,
          transport_type: access.transport_type,
          branch: access.branch,
          code_id: access.code_id,
          price_id: access.price_id,
          passengers: access.passengers,
          subtotal: access.subtotal,
          discount: access.discount,
          total: access.total,
          access_date: new Date(access.access_date),
          client_uid: access.uid
        })
      } else {
        refunds++
      }
    }

    await user.save()

    const resp = {
      message: "Acciones procesadas",
      actions: { charge: totalCharged, refund: refunds },
      balance: user.balance
    }

    console.log("res -->", resp)

    res.json(resp)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error del servidor" })
  }
}

export {
  configV2FB,
  processActionsFB,
  ratesV3FB,
  sendAccessFB,
  userBalancesFB,
  userFlagsFB,
  userV2FB
}