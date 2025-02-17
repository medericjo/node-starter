const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Reply = sequelize.define('replies', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  commentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'comments',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
})

module.exports = Reply