import User from '../models/user.model.js';

const userService = {
  getUsers: async () => {
    const users = await User.findAll();
    return users;
  },

  getUserById: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  getUserByEmail: async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  createUser: async (user) => {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },

  updateUser: async (id, user) => {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    await existingUser.update(user);
    return existingUser;
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return user;
  },
};

export default userService;
