import { model, Schema } from 'mongoose'

const videoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  externalUrl: { type: String },       // Link de YouTube
  video: { type: String, required: true },      // URL firmada del .mp4 en R2
  thumbnail: { type: String },         // URL firmada del thumb
  highlight: { type: String },         // URL firmada del highlight (imagen secundaria)
  newContent: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  toActive: { type: Boolean, default: false },
  compressionStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'completed',
  },
}, { timestamps: true })

export default model('Video', videoSchema)