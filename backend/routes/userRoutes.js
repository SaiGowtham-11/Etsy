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

router.post('/UserSignup', registerUser) //Done
router.post('/UserLogin', test) // Done
router.route('/addfavourite/:user_id/:prod_id').get(addFavourite)
router.route('/getFauvourites/:cust_id/').get(getUserFavourites)
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile)
router.route('/profile/:cust_id').get(getUserProfile) // Here we have to change the code here for Protect
router.route('/profile').put(updateUserProfile) // Tested and working

module.exports = router
