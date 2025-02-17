const User = require('./user.model')
const Post = require('./post.model')
const Comment = require('./comment.model')
const Reply = require('./reply.model')

// Define associations
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' })

Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' })
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' })
Comment.hasMany(Reply, { foreignKey: 'commentId', as: 'replies' })
Reply.belongsTo(Comment, { foreignKey: 'commentId', as: 'comment' })
Reply.belongsTo(User, { foreignKey: 'userId', as: 'user' })

module.exports = {
  User,
  Post,
  Comment,
  Reply,
}
