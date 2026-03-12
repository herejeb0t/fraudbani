import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const renderPanel = async (req, res) => {
  try {
    const token = req.cookies.x_token
    if (!token) return res.redirect('/auth')

    const { user_id } = jwt.verify(token, process.env.webKEY)

    const user = await User.findOne({ user_id })
      .select('-_id -__v -pin_hash')

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    
    const balance = user.balance / 100

    res.render('user/panel', { user: user.names, balance })

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

export {
  renderPanel,
  updateData,
}