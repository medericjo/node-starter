const User = require('./user.model')
const Post = require('./post.model')

// Define associations
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' })

module.exports = {
  User,
  Post
}
