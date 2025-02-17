const sequelize = require('../config/database')
const { User, Post } = require('../models/index')

// Sync the models with the database
// In production, use { alter: false } or remove alter option to prevent automatic schema changes
const isDevelopment = process.env.NODE_ENV === 'development'

// // Define associations
// User.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
// Post.belongsTo(User, { foreignKey: 'userId', as: 'user' })

sequelize.sync({ alter: isDevelopment })
  .then(() => {
    console.log('Database synced successfully')
    if (isDevelopment) {
      console.warn('Warning: Database schema auto-alteration is enabled (development mode)')
    }
  })
  .catch((error) => {
    console.error('Error syncing database:', error)
  })