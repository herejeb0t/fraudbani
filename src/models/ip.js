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
  }
})

export default model('IP', ipSchema)