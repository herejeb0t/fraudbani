import { Comment } from '../models/index.js'
import { encrypt, decrypt, sender } from '../helpers/index.js'

const home = async (req, res) => {
  const raw = req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''
  const ip = raw.split(',')[0].trim()
  sender(`Visitó index --> ${ip}`)

  // Solo trae 3 para el preview, con sus replies
  const commentsPreview = await Comment.find({ parent: null })
    .sort({ pinned: -1, createdAt: -1 })
    .limit(3)
    .lean()

  const previewIds = commentsPreview.map(c => c._id)
  const previewReplies = await Comment.find({ parent: { $in: previewIds } }).lean()

  const repliesMap = {}
  previewReplies.forEach(r => {
    if (!repliesMap[r.parent]) repliesMap[r.parent] = []
    repliesMap[r.parent].push(r)
  })
  commentsPreview.forEach(c => { c.replies = repliesMap[c._id] || [] })

  // Solo para el avg, no necesitas traer los documentos completos
  const [avgResult] = await Comment.aggregate([
    { $match: { parent: null } },
    { $group: { _id: null, avg: { $avg: '$rating' } } }
  ])
  const avgRating = Number((avgResult?.avg || 0).toFixed(1))

  res.render("index", {
    commentsPreview,
    hasMore: true, // bandera para saber si hay más
    avgRating,
    shrBtn: true,
    upBtn: true,
    isIndex: true
  })
}

export default home