import { IP, User } from '../models/index.js'

import { modelSelect, parseJwt } from '../helpers/index.js'

const getUsers = async(req, res) => {
  try {
    
    /*
    console.log(tokenFx)
  
    
    const tokenFx = token.split(" ")[1]
    
    */
    
    const model = modelSelect(req, res)
    let query
    
    console.log(model)
    
    model == IP? query = {phone: {$ne: null}}: query = {main_phone: {$ne: null}}
    
    const [ total, users ]= await Promise.all([
      model.countDocuments(query),
      model.find(query).lean()
    ])
    
    const usersFormatted = users.map(user => ({
  ...user,
  balancePesos: (user.balance || 0) / 100
}))

    const showNameColumn = users.some(user => user.names)
    
    return res.render('user/usersList.hbs', {
      total,
      users: usersFormatted, 
      showNameColumn
    })
    
  } catch (err) {
    console.log(err)
        res.status(500).json({ err });
  }
}

export { 
  getUsers 
}