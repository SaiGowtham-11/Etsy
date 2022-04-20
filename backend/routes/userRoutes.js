const express = require('express')
//const auth = require('registry-auth-token')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  addUser,
  test,
  getUserProfile,
  updateUserProfile,
  addFavourite,
  getUserFavourites,
  registerUser,
} = require('../controllers/userController')

router.post('/UserSignup', registerUser)
router.post('/UserLogin', test)
router.route('/addfavourite/:user_id/:prod_id').get(protect, addFavourite)
router.route('/getFauvourites/:cust_id/').get(protect, getUserFavourites)
router.route('/profile/:cust_id').get(getUserProfile)

// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile)

module.exports = router
