module.exports.sampleMiddleware = (req, res, next) => {
  console.log("Middleware TEST")
  return next()
}
