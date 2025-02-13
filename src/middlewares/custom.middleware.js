exports.customMiddleware = (req, res, next) => {
  console.log('Hello from custom middleware.')
  next()
}