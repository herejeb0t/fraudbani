import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const JWT_SECRET = process.env.webKEY

const renderForm = (req, res) => {
  res.render('./layouts/auth.hbs')
}

const webAuth = async (req, res) => {
  try {
    const { main_phone, pin } = req.body
    console.log(main_phone)
    const user = await User.findOne({ main_phone })
    if (!user) return res.status(400).json({ message: 'Error en credenciales' })

    const validPin = await bcrypt.compare(pin, user.pin_hash)
    if (!validPin) return res.status(401).json({ message: 'Error en credenciales' })

    const token = jwt.sign(
      {
        user_id: user.user_id,
        main_phone: user.main_phone
      },
      JWT_SECRET,
      { expiresIn: '180d' }
    )
    
    
    
    return res.cookie('x_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 180,
    })
    .redirect('/panel')

  } catch (err) {
    res.status(500).json({ message: 'Error del servidor', error: err.message })
  }
}

export {
  renderForm,
  webAuth,
}