const express = require('express')
//const auth = require('registry-auth-token')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  addUser,
  test,
  getUserProfile,
} = require('../controllers/userController')

router.post('/UserSignup', addUser)
router.post('/UserLogin', test)
router.route('/profile').get(protect, getUserProfile)

module.exports = router
