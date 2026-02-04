import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { generateUID } from '../helpers/index.js'

const JWT_SECRET = process.env.KEY

const signUpFB = async(req, res) => {
  try {
    const { main_phone, pin, ...rest } = req.body

    if (!/^\d{4}$/.test(pin))
      return res.status(400).json({ message: 'El PIN debe tener 4 dígitos' })

    const existing = await User.findOne({ main_phone })
    if (existing) return res.status(400).json({ message: 'El número ya existe' })

    const pin_hash = await bcrypt.hash(pin, 10)

    const user = new User({
      ...rest,
      main_phone,
      pin_hash,
      user_id: generateUID(),
      pin_needed: true,
      name_edited: false
    })

    await user.save()

    res.json({ message: 'Usuario creado', user_id: user.user_id })
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor'+err })
  }
}

const loginFB = async (req, res) => {
  try {
    const { main_phone, pin } = req.body
    console.log(main_phone)
    const user = await User.findOne({ main_phone })
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' })

    const validPin = await bcrypt.compare(pin, user.pin_hash)
    if (!validPin) return res.status(401).json({ message: 'PIN incorrecto' })

    const token = jwt.sign(
      {
        user_id: user.user_id,
        main_phone: user.main_phone
      },
      JWT_SECRET,
      { expiresIn: '180d' }
    )

    res.json({ token: 'Bearer ' + token })
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor'+err })
  }
}

const checkPinFB = async(req, res) => {
  
  res.json({ user_pin: true, alt_phone: null})
}

const verifyPinFB = async(req, res) => {
   try {
    const { phone, pin } = req.body
    console.log(phone)
    
    const user = await User.findOne({ main_phone: phone })
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' })

    const validPin = await bcrypt.compare(pin, user.pin_hash)
    if (!validPin) return res.status(401).json({ message: 'PIN incorrecto' })

    const token = jwt.sign(
      {
        user_id: user.user_id,
        main_phone: user.phone
      },
      JWT_SECRET,
      { expiresIn: '180d' }
    )

    res.json({ user_token: token })
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor'+err })
  }
}

export {
  checkPinFB,
  loginFB,
  signUpFB,
  verifyPinFB
}