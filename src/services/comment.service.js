const { User, Post, Comment, Reply } = require('../models')

exports.getComments = async () => {
  const comments = await Comment.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
      {
        model: Post,
        as: 'post',
        attributes: ['id', 'title'],
      },
      {
        model: Reply,
        as: 'replies',
        attributes: ['id', 'content'],
      },
    ],
  })
  return comments
}

exports.getCommentById = async id => {
  const comment = await Comment.findByPk(id, {
    include: [
      {
        model: Post,
        as: 'post',
        attributes: ['id', 'title'],
      },
      {
        model: Reply,
        as: 'replies',
        attributes: ['id', 'content'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
    ],
  })
  if (!comment) {
    throw new Error('Comment not found')
  }
  return comment
}

exports.createComment = async commentData => {
  if (!commentData.postId) {
    throw new Error('Post ID is required')
  }

  if (!commentData.userId) {
    throw new Error('User ID is required')
  }

  const comment = await Comment.create(commentData)
  return this.getCommentById(comment.id)
}

exports.updateComment = async (id, commentData) => {
  const comment = await Comment.findByPk(id)

  if (!comment) {
    throw new Error('Comment not found')
  }

  if (commentData.userId && commentData.userId !== comment.userId) {
    throw new Error('Unauthorized: User ID does not match comment owner')
  }

  await comment.update(commentData)
  return this.getCommentById(comment.id)
}

exports.deleteComment = async id => {
  const comment = await Comment.findByPk(id)
  if (!comment) {
    throw new Error('Comment not found')
  }
  await comment.destroy()
  return { message: 'Comment deleted successfully' }
}
