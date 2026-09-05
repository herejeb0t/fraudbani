import { Comment } from '../models/index.js'
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from 'fs/promises'

import cloudinary from 'cloudinary'
import sanitize from 'sanitize-html'

import { fileUpload } from '../helpers/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const cloudinaryv2 = cloudinary.v2
cloudinaryv2.config( process.env.CLOUDINARY_URL )


const loadFile = async (req, res) => {
  try {
    const isReply = Boolean(req.body.parentId)
    let photo = '/./img/avatar.png'

    if (req.files && req.files.file) {
      const { tempFilePath } = req.files.file;

      const result = await cloudinaryv2.uploader.upload(tempFilePath);
      photo = result.secure_url;

      await fs.unlink(tempFilePath);
    }

    if (!req.body.comment 
    //|| !req.body.rating
    ) {
      return res.status(400).json({ msg: 'Datos incompletos' });
    }
    
    if (
  typeof req.body.comment !== 'string' ||
  req.body.comment.length < 3 ||
  req.body.comment.length > 900
) {
  return res.status(400).json({ msg: 'Comentario inválido' })
}
if (!isReply) {
  if (![1,2,3,4,5].includes(Number(req.body.rating))) {
    return res.status(400).json({ msg: 'Rating inválido' })
  }
}

const cleanComment = sanitize(req.body.comment, {
  allowedTags: [],
  allowedAttributes: {}
})

    const cleanName = sanitize(req.body.name || 'Anónimo', {
  allowedTags: [],
  allowedAttributes: {}
}).slice(0, 60) // límite razonable de longitud

await Comment.create({
  name: cleanName,
  comment: cleanComment,
  photo,
  parent: req.body.parentId || null,
  rating: isReply ? undefined : Number(req.body.rating),
  replie: isReply ? true : false
})

    res.redirect('/#newComment');
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}

const getComments = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1)
  const limit = 10
  const skip = (page - 1) * limit

  const [comments, total] = await Promise.all([
    Comment.find({ parent: null })
      .sort({ pinned: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Comment.countDocuments({ parent: null })
  ])

  const commentIds = comments.map(c => c._id)
  const replies = await Comment.find({ parent: { $in: commentIds } }).lean()

  const repliesMap = {}
  replies.forEach(r => {
    if (!repliesMap[r.parent]) repliesMap[r.parent] = []
    repliesMap[r.parent].push(r)
  })
  comments.forEach(c => { c.replies = repliesMap[c._id] || [] })

  res.json({
    comments,
    page,
    totalPages: Math.ceil(total / limit)
  })
}

const react = async (req, res) => {
  const { id } = req.params
  const { type } = req.body // 'remg', 'lov', 'mi', etc.

  const validTypes = ['remg', 'lov', 'mi', 'happy', 'wow', 'sad', 'ang']
  if (!validTypes.includes(type)) return res.status(400).json({ error: 'Reacción inválida' })

  const comment = await Comment.findById(id)
  if (!comment) return res.status(404).json({ error: 'No encontrado' })

  const current = comment.reactions.get(type) || 0
  comment.reactions.set(type, current + 1)
  await comment.save()

  res.json({ reactions: Object.fromEntries(comment.reactions) })
}

export {
  getComments,
  loadFile,
  react
}

