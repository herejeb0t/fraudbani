import { model, Schema } from 'mongoose'

const rateSchema = Schema({
  rate_type: {
    type: String,
    required: true,
    trim: true
  },
  transport_type: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  price_id: {
    type: String,
    required: true
  }
}, { _id: false })

const ipRatesSchema = Schema({
  ip: {
    type: String,
    required: true,
    index: true
  },
  rates: {
    type: [rateSchema],
    default: []
  }
}, {
  timestamps: true
});

export default model('IpRate', ipRatesSchema);