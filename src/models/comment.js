import { Schema, model } from 'mongoose'

const commentSchema = Schema({
  name: { type: String, required: false, default: 'Anónimo' },
  photo: { type: String, default: null },
  rating: { type: Number, min: 1, max: 5, required: false },
  comment: { type: String, required: true },
  img: { type: String, required: false },
  itsAFraudbaniDev: {
    type: Boolean,
    default: false
  },
  parent: { type: Schema.Types.ObjectId, ref: 'Comment', default: null }

},
{
  timestamps: true 
})

export default model('Comment', commentSchema)