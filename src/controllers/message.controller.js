import { sender } from '../helpers/index.js'

const sendMessage = (req, res) => {
  let msg
 
  if(req.query.ip) {
  msg = `■■■■■🌐🌟👤■■■■■
🌐 IP: ${req.query.ip}
🗺 País: ${req.query.country_name}
🌃 Ciudad: ${req.query.city}
🔌Int. Comp: ${req.query.org}
🔗URL : ${req.query.at}
■■■■■■■■■■■■■■■`
  } 
  
  sender(msg || 'Sin mensaje', res)
  
  res.redirect('/')
  
}

export default sendMessage