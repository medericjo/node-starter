const sequelize = require('../config/database')
const User = require('../models/user.model')

const seedUsers = async () => {
  await User.create({
    name: 'John Doe',
    email: 'john@example.com',
  })
}

const run = async () => {
  try {
    await sequelize.sync({ force: true })
    await seedUsers()
    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await sequelize.close()
  }
}

run()