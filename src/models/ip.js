import { model, Schema } from 'mongoose'

const ipSchema = Schema({
  encIp: {
    type: String,
    default: null,
    required: false,
    unique: false,
  },
  auth: {
    type: String,
    default: null,
    required: false,
    unique: false,
  },
  balance: {
    type: Number,
    default: 30000
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
})

export default model('IP', ipSchema)