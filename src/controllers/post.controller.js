const postService = require('../services/post.service')

exports.getPosts = async (req, res) => {
  const posts = await postService.getPosts()
  res.status(200).json(posts)
}

exports.getPostById = async (req, res) => {
  const post = await postService.getPostById(req.params.id)
  res.status(200).json(post)
}

exports.createPost = async (req, res) => {
  const post = await postService.createPost(req.body)
  res.status(201).json(post)
}

exports.updatePost = async (req, res) => {
  const post = await postService.updatePost(req.params.id, req.body)
  res.status(200).json(post)
}

exports.deletePost = async (req, res) => {
  const post = await postService.deletePost(req.params.id)
  res.status(200).json(post)
}