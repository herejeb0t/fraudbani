//import { requests } from '../helpers/index.js'

const getEvents = async(req, res) => {
  try {/*
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
    
    res.send(resp)*/
    const now = new Date().toISOString()
  res.json({
      "data": [
/*{
"id": "24157073-4597-4878-9a5b-a5337d2d3e2b",
"title": "Tu token 👍🏾",
"description": `Tu token es --> ${req.headers.authorization}`,
"detailedDescription": `Tu token es --> ${ req.headers.authorization }`,
"eventDates": {
"dates": [
"2026-01-20T12:00:00Z",
"2026-12-31T23:59:59Z"
],
"specific": false
},
"createdAt": "2026-03-03T23:57:13.210Z",
"updatedAt": "2026-03-03T23:57:13.210Z",
"is_active": true,
"location": "Nuevo León",
"address": "Nuevo León",
"price": "100.00",
"media": [
{
"id": "39c5e3a8-7a32-49fd-9cd2-285bc4585eed",
"key": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Antifa_logo.svg/1280px-Antifa_logo.svg.png",
"file_name": "1280px-Antifa_logo.svg.png",
"mime_type": "image/png",
"file_size": 509227,
"type": "COVER",
"createdAt": "2026-03-03T23:57:13.210Z",
"updatedAt": "2026-03-03T23:57:13.210Z"
},
{
"id": "d86d4e99-b9c7-4e6e-b817-68f44ed92db4",
"key": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Antifa_logo.svg/1280px-Antifa_logo.svg.png",
"file_name": "1280px-Antifa_logo.svg.png",
"mime_type": "image/png",
"file_size": 960020,
"type": "DESCRIPTION",
"createdAt": "2026-03-03T23:57:13.210Z",
"updatedAt": "2026-03-03T23:57:13.210Z"
}
],
"category": {
"id": "17aee0c6-8765-4d7e-b703-8993a5506996",
"nameCategory": "Museos",
"isActive": true,
"createdAt": "2026-01-08T16:57:13.021Z",
"updatedAt": "2026-01-08T16:57:13.021Z"
}
}, */       
{
"id": "24157073-4597-4878-9a5b-a5337d2d3e2b",
"title": "Holuuu",
"description": "Holu, estoy vivo 🗣 🏴",
"detailedDescription": "Holu, estoy vivo 🗣 🏴",
"eventDates": {
"dates": [
now,
"2026-12-31T23:59:59Z"
],
"specific": false
},
"createdAt": "2026-03-03T23:57:13.210Z",
"updatedAt": "2026-03-03T23:57:13.210Z",
"is_active": true,
"location": "Fraudbani 🐁",
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
}
      ]
    }) 
    
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Error API externa" });
  }
}

export {
  getEvents
}