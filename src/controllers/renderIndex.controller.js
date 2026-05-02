import Comment from '../models/comment.js'
import { encrypt, decrypt, sender } from '../helpers/index.js'

const home = async (req, res) => {
  const raw = req.headers['x-forwarded-for'] 
    || req.connection.remoteAddress 
    || ''
  const ip = raw.split(',')[0].trim()
      sender(`Visitó index --> ${ip}`)
      
  const comments = await Comment.find({ parent: null })
  .sort({ createdAt: -1 }) // más recientes primero
  .lean();
  
  const commentIds = comments.map(c => c._id)

  const replies = await Comment.find({
  parent: { $in: commentIds }
}).lean()

// agrupar respuestas
const repliesMap = {}

replies.forEach(r => {
  if (!repliesMap[r.parent]) repliesMap[r.parent] = []
  repliesMap[r.parent].push(r)
})

// insertar respuestas en cada comentario
comments.forEach(c => {
  c.replies = repliesMap[c._id] || []
})
  
  const rawAvg =
  comments.reduce((sum, c) => sum + (c.rating || 0), 0) /
  (comments.length || 1)

const avgRating = Number(rawAvg.toFixed(1));
//console.log(encrypt(''))
res.render("index", {
  commentsPreview: comments.slice(0, 3),
  commentsAll: comments,
  avgRating,
  hmBtns: true,
  isIndex: true
});


}

export default home