import { model, Schema } from 'mongoose';

// Esquema para el subdocumento `eventDates`
const eventDatesSchema = new Schema({
  dates: {
    type: [Date],
    required: true,
  },
  specific: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Esquema para el subdocumento `eventVisible` (puede ser null)
const eventVisibleSchema = new Schema({
  eventVisibleFrom: Date,
  eventVisibleUntil: Date,
}, { _id: false }); // No necesita _id propio

// Esquema para el subdocumento `media`
const mediaSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  mime_type: {
    type: String,
    required: true,
  },
  file_size: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['COVER', 'DESCRIPTION'], // según el JSON
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false }); // No necesita _id propio (usamos el campo id)

// Esquema para el subdocumento `category`
const categorySchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  nameCategory: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

// Esquema principal del evento
const eventSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Asumimos que el id es único
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailedDescription: {
    type: String,
    required: true,
  },
  eventDates: {
    type: eventDatesSchema,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: String, // se guarda como string para mantener formato (ej: "420.00")
    required: true,
  },
  eventVisible: {
    type: eventVisibleSchema,
    default: null, // puede ser null
  },
  media: {
    type: [mediaSchema],
    required: true,
    default: [],
  },
  category: {
    type: categorySchema,
    required: true,
  },
  toActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true, // Mongoose crea automáticamente `createdAt` y `updatedAt` para el documento principal
});

// Índice opcional para búsquedas por título o id
eventSchema.index({ title: 'text' });

export default model('Event', eventSchema);