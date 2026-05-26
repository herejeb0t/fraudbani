import IP from '../models/ip.js'
import { parseJwt } from '../helpers/index.js'

const getUsers = async(req, res) => {
  try {
    
    /*
    console.log(tokenFx)
  
    
    const tokenFx = token.split(" ")[1]
    
    */
    const users = await IP.find().lean()
    return res.render('user/usersList.hbs', {
      users, 
    })
  } catch (err) {
        res.status(500).json({ err });
  }
}

export { 
  getUsers 
}