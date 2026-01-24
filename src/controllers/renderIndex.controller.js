import Comment from '../models/comment.js'

const home = async (req, res) => {
  const comments = await Comment.find()
  .sort({ createdAt: -1 }) // más recientes primero
  .lean();
  
  const rawAvg =
  comments.reduce((sum, c) => sum + c.rating, 0) /
  (comments.length || 1);

const avgRating = Number(rawAvg.toFixed(1));

res.render("index", {
  commentsPreview: comments.slice(0, 3),
  commentsAll: comments,
  avgRating
});


}

export default home