import { Schema, model } from 'mongoose'

const commentSchema = Schema({
  name: { type: String, required: false, default: 'Anónimo' },
  photo: { type: String, default: null },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  itsAFraudbaniDev: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now }
})

export default model('Comment', commentSchema)