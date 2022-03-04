const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const protect = asyncHandler(async (req, res, next) => {
  let token = null

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded.id) {
        req.userAuth = true
        req.userId = decoded.id
      } else {
        req.userAuth = false
        req.userId = decoded.id
      }
      next()
    } catch (error) {
      throw new Error(error)
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = protect
