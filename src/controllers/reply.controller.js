const replyService = require('../services/reply.service')

exports.getReplies = async (req, res) => {
  const replies = await replyService.getReplies()
  res.status(200).json(replies)
}


exports.getReplyById = async (req, res) => {
  const reply = await replyService.getReplyById(req.params.id)
  res.status(200).json(reply)
}


exports.createReply = async (req, res) => {
  const reply = await replyService.createReply(req.body)
  res.status(201).json(reply)
}


exports.updateReply = async (req, res) => {
  const reply = await replyService.updateReply(req.params.id, req.body)
  res.status(200).json(reply)
}


exports.deleteReply = async (req, res) => {
  const reply = await replyService.deleteReply(req.params.id)
  res.status(200).json(reply)
}
