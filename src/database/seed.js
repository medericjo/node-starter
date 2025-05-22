const sequelize = require('../config/database')
const { User, Post, Comment, Reply } = require('../models/index')

const seedUsers = async () => {
  return await User.bulkCreate([
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' }
  ])
}

const seedPosts = async (userId) => {
  return await Post.create({
    title: 'My First Post',
    content: 'This is the content of my first post',
    userId
  })
}

const seedComments = async (users, postId) => {
  return await Comment.bulkCreate([
    { content: 'Great post!', userId: users[0].id, postId },
    { content: 'Really enjoyed reading this!', userId: users[1].id, postId }
  ])
}

const seedReplies = async (users, comments) => {
  return await Reply.bulkCreate([
    { content: 'Thanks for your comment!', userId: users[0].id, commentId: comments[0].id },
    { content: 'Glad you enjoyed it!', userId: users[1].id, commentId: comments[1].id }
  ])
}

const run = async () => {
  try {
    await sequelize.sync({ force: true })
    const users = await seedUsers()
    const post = await seedPosts(users[0].id)
    const comments = await seedComments(users, post.id)
    await seedReplies(users, comments)
    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await sequelize.close()
  }
}

run()