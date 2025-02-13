const User = require('../models/user.model')

exports.getUsers = async () => {
  const users = await User.findAll()
  return users
}

exports.getUserById = async (id) => {
  const user = await User.findByPk(id)
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

exports.getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

exports.createUser = async (user) => {
  try {
    const newUser = await User.create(user)
    return newUser
  } catch (error) {
    throw new Error('Failed to create user')
  }
}

exports.updateUser = async (id, user) => {
  const existingUser = await User.findByPk(id)
  if (!existingUser) {
    throw new Error('User not found')
  }
  await existingUser.update(user)
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
