const sequelize = require('../config/database')
const { User, Post, Comment, Reply } = require('../models/index')

const seedUsers = async () => {
  const users = await Promise.all([
    User.create({
      name: 'John Doe',
      email: 'john@example.com',
    }),
    User.create({
      name: 'Jane Smith', 
      email: 'jane@example.com',
    })
  ])
  return users
}

const seedPosts = async (userId) => {
  const post = await Post.create({
    title: 'My First Post',
    content: 'This is the content of my first post',
    userId: userId
  })
  return post
}

const seedComments = async (users, postId) => {
  const comments = await Promise.all([
    Comment.create({
      content: 'Great post!',
      userId: users[0].id,
      postId: postId
    }),
    Comment.create({
      content: 'Really enjoyed reading this!',
      userId: users[1].id, 
      postId: postId
    })
  ])
  return comments
}

const seedReplies = async (users, comments) => {
  await Promise.all([
    Reply.create({
      content: 'Thanks for your comment!',
      userId: users[0].id,
      commentId: comments[0].id
    }),
    Reply.create({
      content: 'Glad you enjoyed it!',
      userId: users[1].id,
      commentId: comments[1].id
    })
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