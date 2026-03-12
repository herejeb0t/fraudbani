import jwt from 'jsonwebtoken'
import  Usuario  from '../models/user.js'

const jwtVal = async (req, res, next) => {
  const token = req.cookies.x_token;
  
  if (!token) {
    return res.status(401)
    .json({
      msg: "Petición sin token!",
    });
    //.render('errors/error.hbs', { err: 'No autorizado', code : 401 })
  }

  try {
    const { user_id } = jwt.verify(token, process.env.webKEY);
    const getUser = await Usuario.findOne({user_id})

    if (!getUser) {
      return res.status(401).json({
        msg: 'Usuario no tiene permitido eliminar, eliminado.'
      })
    }

    //verificar uid true
    /*if (!getUser.estado) {
      return res.status(401).json({
        msg: "Usuario no tiene permitido eliminar, desactivado.",
      });
    }
    */

  req.user = getUser;

  next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      msg: "Token invalido",
    });
  }
}

export default jwtVal