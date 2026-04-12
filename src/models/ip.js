import { model, Schema } from 'mongoose'

const ipSchema = Schema({
  token: {
    type: String,
    required: true,
  }
})

export default model('IP', ipSchema)