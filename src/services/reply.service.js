const { Reply, Post, Comment, User } = require('../models')

exports.getReplies = async () => {
  const replies = await Reply.findAll({
    include: [
      {
        model: User,
        as: 'user',
      },
      {
        model: Post,
        as: 'post',
      },
      {
        model: Comment,
        as: 'comment',
      },
    ],
  })
  return replies
}

exports.getReplyById = async id => {
  const reply = await Reply.findByPk(id, {
    include: [
      {
        include: [
          {
            model: Post,
            as: 'post',
          },
          {
            model: Comment,
            as: 'comment',
          },
          {
            model: User,
            as: 'user',
          },
        ],
      },
    ],
  })
  if (!reply) {
    throw new Error('Reply not found')
  }
  return reply
}

exports.createReply = async replyData => {
  if (!replyData.commentId) {
    throw new Error('Comment ID is required')
  }

  if (!replyData.userId) {
    throw new Error('User ID is required')
  }

  const reply = await Reply.create(replyData)
  return this.getReplyById(reply.id)
}

exports.updateReply = async (id, replyData) => {
  const reply = await Reply.findByPk(id)

  if (!reply) {
    throw new Error('Reply not found')
  }

  if (replyData.userId && replyData.userId !== reply.userId) {
    throw new Error('Unauthorized: User ID does not match reply owner')
  }

  await reply.update(replyData)
  return this.getReplyById(reply.id)
}

exports.deleteReply = async id => {
  const reply = await Reply.findByPk(id)
  if (!reply) {
    throw new Error('Reply not found')
  }
  await reply.destroy()
  return { message: 'Reply deleted successfully' }
}
