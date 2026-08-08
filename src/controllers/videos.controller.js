import { IP, Video } from '../models/index.js'
import { encrypt, requests, parseJwt } from '../helpers/index.js'

const newVideo = async(req, res) => {
  
  const { title, description, externalUrl, highlight, toActive, video } = req.body
  
  try {
    const nwvi = await Video.create({
      title,
      externalUrl,
      highlight,
      toActive,
      video
    })

    res.json({nwvi})
  } catch (err) {
    res.status(400).json({ err })
  }
}

const getVideos = async(req, res) => {
  const auth = req.headers.authorization

  let data
  try {
    data = parseJwt(auth)
    if (!data?.main_phone) throw new Error()
  } catch {
    return res.status(400).json({message: 'Token Invalido'})
  }
    
    const phone = data.main_phone
  
  try {
    const isInDB = await IP.findOne({ auth })
    const encPhone = encrypt(phone)

    console.log(isInDB)

    if(!isInDB || !isInDB.auth) {
      const videos = await Video.find({title: 'Activador'})
    const data = videos.map(v => ({
    ...v.toObject(),
    externalUrl: v.externalUrl 
      ? `${v.externalUrl}?user=${auth}` 
      : null
    }))

    return res.json(data)
    }

    console.log(isInDB)

    const videos = await Video.find({toActive: true})
    const data = videos.map(v => ({
    ...v.toObject(),
    externalUrl: v.externalUrl == 'https://fraudbani-fyfr.onrender.com/items'
      ? `${v.externalUrl}?user=${encPhone}` 
      : v.externalUrl
    }))
    console.log(videos)
    res.json(data)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error API externa" })
  }
}

export {
  getVideos,
  newVideo
}