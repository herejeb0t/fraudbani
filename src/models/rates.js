import { model, Schema } from 'mongoose'

const rateSchema = new Schema({
  rate_type: {
    type: String,
    required: true,
    enum: ['ORDINARIA'], // agrega más si tienes otros rate_type
    trim: true
  },
  transport_type: {
    type: String,
    required: true,
    enum: [
      'TRANSMETRO',
      'ECOVIA',
      'RUTA_EXPRESS_MORADO',
      'RUTA_GUINDA',
      'RUTA_AMARILLA',
      'RUTA_MORADA',
      'RUTA_INTEGRADA',
      'RUTA_AVANTE',
      'METRO',
      'RUTA_EXPRESS'
    ],
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  price_id: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
})

export default model('Rate', rateSchema)