const { User, Post } = require('../models/index')

exports.getUsers = async () => {
  const users = await User.findAll({
    include: [{
      model: Post,
      as: 'post',
      attributes: ['title', 'content']
    }]
  })
  return users
}

exports.getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [{
      model: Post,
      as: 'post',
      attributes: ['title', 'content']
    }]
  })
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

exports.getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } }, {
    include: [{
      model: Post,
      as: 'post',
      attributes: ['title', 'content']
    }]
  })
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

exports.createUser = async (userData) => {
  const existingUser = await User.findOne({ where: { email: userData.email } })
  if (existingUser) {
    throw new Error('User already exists')
  }
  const newUser = await User.create(userData)
  return newUser
}

exports.updateUser = async (id, userData) => {
  const existingUser = await User.findByPk(id)
  if (!existingUser) {
    throw new Error('User not found')
  }
  await existingUser.update(userData)
  return existingUser
}

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id)
  if (!user) {
    throw new Error('User not found')
  }
  await user.destroy()
  return user
}
