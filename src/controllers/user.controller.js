const userService = require('../services/user.service')

exports.getUsers = async (req, res) => {
  const users = await userService.getUsers()
  res.status(200).json(users)
}


exports.getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id)
  res.status(200).json(user)
}


exports.createUser = async (req, res) => {
  const user = await userService.createUser(req.body)
  res.status(201).json(user)
}


exports.updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body)
  res.status(200).json(user)
}


exports.deleteUser = async (req, res) => {
  const user = await userService.deleteUser(req.params.id)
  res.status(200).json(user)
}
