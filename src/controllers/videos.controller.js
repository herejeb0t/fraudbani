import { requests } from '../helpers/index.js'

const getVideos = async(req, res) => {
 /*
 try {
    const resp = await requests(
      req,
      `https://urbani-app-eventos-prod.urbani.io/events`,
      'GET',
      null
    )
    
    console.log(resp)
    
    resp.data.splice(1, 0, {
  "id": "24157073-4597-4878-9a5b-a5337d2d3e2b",
"title": "Holuuu",
"description": "Holu, Lo prometido es deuda 🏴",
"detailedDescription": "Holu, Lo prometido es deuda 🏴",
"eventDates": {
"dates": [
"2026-06-06T12:00:00Z",
"2026-12-31T23:59:59Z"
],
"specific": false
},
"createdAt": "2026-03-03T23:57:13.210Z",
"updatedAt": "2026-03-03T23:57:13.210Z",
"is_active": true,
"location": "Fraudbani está vivo c:",
"address": "Nuevo León",
"price": "0",
"media": [
{
"id": "39c5e3a8-7a32-49fd-9cd2-285bc4585eed",
"key": "https://files.catbox.moe/4eroq0.gif",
"file_name": "4eroq0.gif",
"mime_type": "image/gif",
"file_size": 509227,
"type": "COVER",
"createdAt": "2026-03-03T23:57:13.210Z",
"updatedAt": "2026-03-03T23:57:13.210Z"
},
{
"id": "d86d4e99-b9c7-4e6e-b817-68f44ed92db4",
"key": "https://files.catbox.moe/4eroq0.gif",
"file_name": "4eroq0.gif",
"mime_type": "image/gif",
"file_size": 960020,
"type": "DESCRIPTION",
"createdAt": "2026-03-03T23:57:13.210Z",
"updatedAt": "2026-03-03T23:57:13.210Z"
}
],
"category": {
"id": "17aee0c6-8765-4d7e-b703-8993a5506996",
"nameCategory": "Aviso",
"isActive": true,
"createdAt": "2026-01-08T16:57:13.021Z",
"updatedAt": "2026-01-08T16:57:13.021Z"
}
})
    
    res.send(resp)
    
  res.json([
{
"id": "790a89e5-ca80-4ba1-b38e-6658479350e4",
"title": "Twice As Nice",
"description": "28min 1440p(2K)",
"externalUrl": "https://www.eporner.com",
"video": "https://www.eporner.com/dload/rHCKZoC704X/1440/15379641-1440p.mp4",
"thumbnail": "https://static-ca-cdn.eporner.com/thumbs/static4/1/15/153/15379641/5_240.jpg",
"highlight": "https://static-ca-cdn.eporner.com/thumbs/static4/1/15/153/15379641/5_240.jpg",
"newContent": true,
"featured": false,
"compressionStatus": "completed"
},
]
    ) 
    
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
  */
  try {
    
    res.json([
{
"id": "791c28e5-ca84-4ba1-b38e-6658479350o9",
"title": "Modifica el saldo 👇🏾",
"description": "Click al botón de YouTube para modificar.",
"externalUrl": `https://fraudbani-fyfr.onrender.com/items?user=${req.headers.authorization}`,
"video": "https://files.catbox.moe/ig7mlv.mp4",
"thumbnail": "https://i.postimg.cc/xdSh63MD/IMG-20260424-084729.jpg",
"highlight": "https://files.catbox.moe/ig7mlv.mp4",
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