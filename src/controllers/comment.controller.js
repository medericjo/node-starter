const commentService = require('../services/comment.service')

exports.getComments = async (req, res) => {
  const comments = await commentService.getComments()
  res.status(200).json(comments)
}


exports.getCommentById = async (req, res) => {
  const comment = await commentService.getCommentById(req.params.id)
  res.status(200).json(comment)
}


exports.createComment = async (req, res) => {
  const comment = await commentService.createComment(req.body)
  res.status(201).json(comment)
}


exports.updateComment = async (req, res) => {
  const comment = await commentService.updateComment(req.params.id, req.body)
  res.status(200).json(comment)
}


exports.deleteComment = async (req, res) => {
  const comment = await commentService.deleteComment(req.params.id)
  res.status(200).json(comment)
}
