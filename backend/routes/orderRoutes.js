const express = require('express')
//const auth = require('registry-auth-token')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  addOrder,
  getordersByCustomerID,
  getordersByOrderID,
} = require('../controllers/orderController.js')

router.route('/add').post(protect, addOrder)
router.route('/getOrderByCustomer/:id').get(protect, getordersByCustomerID)
router.route('/getOrderDetailsByOrderID/:id').get(protect, getordersByOrderID)
module.exports = router
