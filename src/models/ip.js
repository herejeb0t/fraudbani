import { model, Schema } from 'mongoose'

const ipSchema = Schema({
  encIp: {
    type: String,
    required: true,
    unique: true,
  }
})

export default model('IP', ipSchema)