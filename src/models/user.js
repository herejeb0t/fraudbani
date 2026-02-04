import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  user_id: {
    type: String,
    unique: true,
    index: true
  },

  main_phone: {
    type: String,
    unique: true,
    required: true
  },

  alternative_phone: {
    type: String,
    default: '0'
  },

  pin_hash: {
    type: String,
    required: true
  },

  pin_needed: {
    type: Boolean,
    default: true
  },

  name_edited: {
    type: Boolean,
    default: false
  },

  register_date: {
    type: Date,
    default: Date.now
  },

  birth_date: {
    type: Date,
    default: Date.now
  },

  civil_status: {
    type: String,
    default: 'SIN ASIGNAR'
  },

  genre: {
    type: String,
    default: 'SIN ASIGNAR'
  },

  names: {
    type: String,
    default: 'SIN ASIGNAR'
  },

  first_last_name: {
    type: String,
    default: 'SIN ASIGNAR'
  },

  second_last_name: {
    type: String,
    default: 'SIN ASIGNAR'
  },

  occupation: {
    type: String,
    default: 'SIN ASIGNAR'
  },

  curp: {
    type: String,
    default: 'SIN ASIGNAR'
  },

  // 📍 Dirección
  city: {
    type: String,
    default: 'SIN ASIGNAR'
  },
  state: {
    type: String,
    default: 'SIN ASIGNAR'
  },
  street: {
    type: String,
    default: 'SIN ASIGNAR'
  },
  colony: {
    type: String,
    default: 'SIN ASIGNAR'
  },
  postal_code: {
    type: String,
    default: '0'
  },
  ext_number: {
    type: String,
    default: '0'
  },

  // 📧 Email
  email: {
    type: String,
    default: null
  },

  email_change_date: {
    type: Date,
    default: null
  },

  // 💰 Saldos
  balance: {
    type: Number,
    default: 0
  },

  coins: {
    type: Number,
    default: 0
  },

  points: {
    type: Number,
    default: 0
  },

  points_tm: {
    type: Number,
    default: null
  }

}, { timestamps: true })

export default model('User', userSchema)