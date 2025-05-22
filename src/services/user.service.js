const { User, Post } = require('../models/index')

/**
 * Retrieves all users along with their posts.
 * 
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 */
exports.getUsers = async () => {
  const users = await User.findAll({
    include: [
      {
        model: Post,
        as: 'posts',
        attributes: ['title', 'content'],
      },
    ],
  })
  return users
}

/**
 * Retrieves a user by their ID along with their posts.
 * 
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} Throws an error if the user is not found.
 */
exports.getUserById = async id => {
  const user = await User.findByPk(id, {
    include: [
      {
        model: Post,
        as: 'posts',
        attributes: ['title', 'content'],
      },
    ],
  })
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

/**
 * Retrieves a user by their email along with their posts.
 * 
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} Throws an error if the user is not found.
 */
exports.getUserByEmail = async email => {
  const user = await User.findOne(
    { where: { email } },
    {
      include: [
        {
          model: Post,
          as: 'posts',
          attributes: ['title', 'content'],
        },
      ],
    }
  )
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

/**
 * Creates a new user.
 * 
 * @param {Object} userData - The data for the new user.
 * @returns {Promise<User>} A promise that resolves to the newly created User object.
 * @throws {Error} Throws an error if a user with the same email already exists.
 */
exports.createUser = async userData => {
  const existingUser = await User.findOne(
    {
      where: {
        email: userData.email
      }
    }
  )
  if (existingUser) {
    throw new Error('User already exists')
  }
  const newUser = await User.create(userData)
  return newUser
}

/**
 * Updates an existing user.
 * 
 * @param {string} id - The ID of the user to update.
 * @param {Object} userData - The updated data for the user.
 * @returns {Promise<User>} A promise that resolves to the updated User object.
 * @throws {Error} Throws an error if the user is not found.
 */
exports.updateUser = async (id, userData) => {
  const existingUser = await User.findByPk(id)
  if (!existingUser) {
    throw new Error('User not found')
  }
  await existingUser.update(userData)
  return existingUser
}

/**
 * Deletes a user by their ID.
 * 
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<{message: string}>} A promise that resolves to an object with a success message.
 * @throws {Error} Throws an error if the user is not found.
 */
exports.deleteUser = async id => {
  const user = await User.findByPk(id)
  if (!user) {
    throw new Error('User not found')
  }
  await user.destroy()
  return { message: 'User deleted successfully' }
}
