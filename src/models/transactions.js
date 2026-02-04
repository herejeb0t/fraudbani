import { model, Schema } from 'mongoose'

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  type: {
    type: String,
    enum: ['charge', 'refund', 'topup'],
    required: true
  },

  amount: {
    type: Number,
    required: true   // en centavos
  },

  previous_balance: Number,
  new_balance: Number,

  transport_type: String,
  branch: String,
  code_id: String,
  price_id: String,

  passengers: Number,
  subtotal: Number,
  discount: Number,
  total: Number,

  access_date: Date,

  client_uid: String, // el uid que manda la app
  created_at: {
    type: Date,
    default: Date.now
  }
})

export default model('Transaction', transactionSchema)