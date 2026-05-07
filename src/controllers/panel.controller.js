import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/user.js'
import Transaction from '../models/transactions.js'
import { generateUID } from '../helpers/index.js'

const renderPanel = async (req, res) => {
  try {
    const token = req.cookies.x_token
    if (!token) return res.redirect('/auth')

    const { user_id } = jwt.verify(token, process.env.webKEY)

    const user = await User.findOne({ user_id })
      .select('-_id -__v -pin_hash')

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    
    const balance = user.balance / 100

    res.render('user/panel', { user: user.names, balance, uid: user.user_id })

  } catch (err) {
    res.status(401).redirect('/auth')
  }
}

const updateData = async (req, res) => {
  try {

    const token = req.cookies.x_token
    if (!token) return res.redirect('/auth')

    const { user_id } = jwt.verify(token, process.env.webKEY)

    const { balance } = req.body

    await User.updateOne(
      { user_id },
      {
        balance: balance * 100
      }
    )

    res.redirect('/panel')

  } catch (err) {
    res.status(500).json({ message: 'Error del servidor', error: err.message })
  }
}

const uidRegen = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const token = req.cookies.x_token
    if (!token) return res.redirect('/auth')

    const { user_id } = jwt.verify(token, process.env.webKEY)

    // 1. Buscar el _id del usuario con el uid actual
    const user = await User.findOne({ user_id }).session(session)
    if (!user) {
      await session.abortTransaction()
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    // 2. Borrar todas sus transacciones ANTES de cambiar el uid
    await Transaction.deleteMany({ user: user._id }).session(session)

    // 3. Ahora sí cambiar el uid
    const newUid = generateUID()
    await User.updateOne(
      { _id: user._id },
      { user_id: newUid }
    ).session(session)

    // 4. Confirmar ambas operaciones juntas
    await session.commitTransaction()

    res.clearCookie('x_token').redirect('/auth')

  } catch (err) {
    await session.abortTransaction()
    res.status(500).json({ message: 'Error del servidor', error: err.message })
  } finally {
    session.endSession()
  }
}

export {
  renderPanel,
  uidRegen,
  updateData,
}