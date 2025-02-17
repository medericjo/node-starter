const { User, Post } = require('../models/index')

exports.getPosts = async () => {
  const posts = await Post.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: ['name', 'email']
    }]
  })
  return posts
}

exports.getPostById = async (id) => {
  const post = await Post.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'name', 'email']
    }]
  })
  if (!post) {
    throw new Error('Post not found')
  }
  return post
}

exports.createPost = async (postData) => {
  // Ensure userId is provided
  if (!postData.userId) {
    throw new Error('User ID is required')
  }
  
  const post = await Post.create(postData)
  return this.getPostById(post.id) // Return with user association
}

exports.updatePost = async (id, postData) => {
  const post = await Post.findByPk(id)
  
  if (!post) {
    throw new Error('Post not found')
  }

  // Check if userId matches post's userId
  if (postData.userId && postData.userId !== post.userId) {
    throw new Error('Unauthorized: User ID does not match post owner')
  }

  await post.update(postData)
  return this.getPostById(post.id) // Return with user association
}

exports.deletePost = async (id) => {
  const post = await Post.findByPk(id)
  if (!post) {
    throw new Error('Post not found')
  }
  await post.destroy()
  return true
}

