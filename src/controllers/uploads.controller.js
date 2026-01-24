import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from 'fs'

import cloudinary from 'cloudinary'

import { fileUpload } from "../helpers/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

const cloudinaryv2 = cloudinary.v2
cloudinaryv2.config( process.env.CLOUDINARY_URL )

const loadFile = async (req, res) => {

  try {
    const nombre = await fileUpload(req.files, undefined, 'imgs');
    //const nombre = await fileUpload(req.files, ['txt', 'md', 'php'], 'elpepejaks');

    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(400).json({msg})
  }
};
/*
const updateImage = async(req, res) => {
  const { collection, id } = req.params

  let model;

  switch ( collection ) {
    case 'usuarios':
      model = await Usuario.findById(id)
      if ( !model ) {
        return res.status(400).json({
          msg: `No existe un usuario con id: ${ id }`
        })
      }
      
      break;

      case 'productos':
        model = await Product.findById(id)
        if ( !model ) {
          return res.status(400).json({
            msg: `No existe un producto con id: ${ id }`
          })
        }
        
        break;
  
    default:
      res.status(500).json({ msg: 'No validado!' })
  }

  //Eliminar imágenes previas
  if ( model.img ) {
    const imgPath = join( __dirname, '../uploads', collection, model.img )
    if ( fs.existsSync( imgPath ) ) {
      fs.unlinkSync( imgPath )
    }
  }

  const nombre = await fileUpload(req.files, undefined, collection );
  model.img = nombre

  await model.save()

  res.json({ model })
}

const updateImageCloudinary = async(req, res) => {
  const { collection, id } = req.params

  let model;

  switch ( collection ) {
    case 'usuarios':
      model = await Usuario.findById(id)
      if ( !model ) {
        return res.status(400).json({
          msg: `No existe un usuario con id: ${ id }`
        })
      }
      
      break;

      case 'productos':
        model = await Product.findById(id)
        if ( !model ) {
          return res.status(400).json({
            msg: `No existe un producto con id: ${ id }`
          })
        }
        
        break;
  
    default:
      res.status(500).json({ msg: 'No validado!' })
  }

  //Eliminar imágenes previas
  if ( model.img ) {
    const nombreArr = model.img.split('/')
  }

  const { tempFilePath } = req.files.file
  const { secure_url } = await cloudinaryv2.uploader.upload( tempFilePath )

  model.img = secure_url
  await model.save()

  res.json({ model })

}

const showImage = async(req, res) => {
  const { collection, id } = req.params

  let model;

  switch ( collection ) {
    case 'usuarios':
      model = await Usuario.findById(id)
      if ( !model ) {
        return res.status(400).json({
          msg: `No existe un usuario con id: ${ id }`
        })
      }
      
      break;

      case 'productos':
        model = await Product.findById(id)
        if ( !model ) {
          return res.status(400).json({
            msg: `No existe un producto con id: ${ id }`
          })
        }
        
        break;
  
    default:
      res.status(500).json({ msg: 'No validado!' })
  }

  //Eliminar imágenes previas
  if ( model.img ) {
    const imgPath = join( __dirname, '../uploads', collection, model.img )
    if ( fs.existsSync( imgPath ) ) {
      return res.sendFile( imgPath )
    }
  }

  res.sendFile( join( __dirname, '../assets/noImage.jpg' ) )
}
*/
export {
  loadFile,
  /*updateImage,
  updateImageCloudinary,
  showImage*/
}
