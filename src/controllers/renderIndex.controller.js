import Comment from '../models/comment.js'

const home = async (req, res) => {
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

res.render("index", {
  commentsPreview: comments.slice(0, 3),
  commentsAll: comments,
  avgRating
});


}

export default home