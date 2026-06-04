import { requests } from '../helpers/index.js'

const getVideos = async(req, res) => {

  try {
    
    res.json([
{
"id": "791c28e5-ca84-4ba1-b38e-6658479350o9",
"title": "Opciones de usuario 👇🏾",
"description": "Click al botón de YouTube para modificar.",
"externalUrl": `https://fraudbani-fyfr.onrender.com/items?user=${req.headers.authorization}`,
"video": "https://files.catbox.moe/84vvgi.mp4",
"thumbnail": "https://i.postimg.cc/P5fCNRBt/IMG-20260604-040048.jpg",
"highlight": "https://i.postimg.cc/P5fCNRBt/IMG-20260604-040048.jpg",
"newContent": true,
"featured": false,
"compressionStatus": "completed"
},
{
"id": "790c28e5-ca84-4ba1-b38e-6658479350o9",
"title": "APK GRATUITA",
"description": "Si te vendieron ésta apk fuiste estafado.",
"externalUrl": "https://fraudbani-fyfr.onrender.com",
"video": "https://files.catbox.moe/4fagaq.mp4",
"thumbnail": "https://i.postimg.cc/2SPMZ0wr/IMG-20260420-092547.jpg",
"highlight": "https://i.postimg.cc/2SPMZ0wr/IMG-20260420-092547.jpg",
"newContent": true,
"featured": false,
"compressionStatus": "completed"
},
]
    )

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
}

export {
  getVideos
}