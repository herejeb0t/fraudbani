import { IP, User } from "../models/index.js";
const modelSelect = (req, res) => {
  const { collection } = req.params
        
        switch ( collection ) {
          case 'fraudbani':
            console.log('fraudbani')
            return IP
          break;
          case 'fuckbani':
            return User
          break;
          default:
          return res.status(500).json({
            msg: "No valido",
          });
        }
}

export default modelSelect