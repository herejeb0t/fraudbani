import crypto from 'crypto';
import { Event, IP } from '../models/index.js';

const newEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      detailedDescription,
      fin,
      location,
      address, // ojo: tu schema usa "address"
      key,
      file_name,
      inicio,
      mime_type,
      nameCategory,
    } = req.body;

    const newEventDoc = new Event({
      id: crypto.randomUUID(),
      title,
      description,
      detailedDescription,
      eventDates: {
        dates: [inicio, fin],       // ajusta según lo que necesites
        specific: false,
      },
      is_active: true,
      location,
      address: address,
      price: '0.00',      // ajusta o agrégalo a los campos destructurados
      eventVisible: null,
      media: [
        {
          id: crypto.randomUUID(),
          key: key || 'https://ejemplo.com/placeholder.jpg',
          file_name,
          mime_type,
          file_size: 0,    // ajusta si lo tienes
          type: 'COVER',
        },
        {
          id: crypto.randomUUID(),
          key: key || 'https://ejemplo.com/placeholder.jpg',
          file_name,
          mime_type,
          file_size: 0,
          type: 'DESCRIPTION',
        },
      ],
      category: {
        id: crypto.randomUUID(),
        nameCategory,
        isActive: true,
      },
    });

    const savedEvent = await newEventDoc.save();

    return res.status(201).json({
      message: 'Evento creado correctamente',
      data: savedEvent,
    });

  } catch (error) {
    console.error('Error al guardar el evento:', error);

    if (error.code === 11000) {
      return res.status(409).json({ message: 'Ya existe un evento con ese id', error: error.keyValue });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors });
    }

    return res.status(500).json({ message: 'Error interno al guardar el evento' });
  }
};

const getEvents = async(req, res) => {
  const auth = req.headers.authorization
  
  try {
    
    const authExs = await IP.findOne({ auth })

    if(!authExs || !authExs.auth) {
      const events = await Event.find({toActive: false})
      return res.json({ data: events })
    }
    
    if(!authExs.cargoEvents) {
      authExs.cargoEvents = true
      await authExs.save()
    }
    
    const events = await Event.find({ toActive: true })

  res.json({ data: events })

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
}

export {
  getEvents,
  newEvent
}