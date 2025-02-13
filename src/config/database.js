const { Sequelize } = require('sequelize')

/**
 * Database configuration using Sequelize ORM
 * 
 * Current configuration uses SQLite as the database.
 * To switch to a different database dialect:
 * 
 * For MySQL:
 * const sequelize = new Sequelize({
 *   dialect: 'mysql',
 *   host: 'localhost',
 *   username: 'your_username',
 *   password: 'your_password',
 *   database: 'your_database'
 * })
 * 
 * For PostgreSQL:
 * const sequelize = new Sequelize({
 *   dialect: 'postgres',
 *   host: 'localhost',
 *   username: 'your_username',
 *   password: 'your_password',
 *   database: 'your_database'
 * })
 * 
 * For Microsoft SQL Server:
 * const sequelize = new Sequelize({
 *   dialect: 'mssql',
 *   host: 'localhost',
 *   username: 'your_username',
 *   password: 'your_password',
 *   database: 'your_database'
 * })
 */

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/database.sqlite'
})

module.exports = sequelize
