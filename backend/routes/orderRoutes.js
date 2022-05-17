const express = require('express')
//const auth = require('registry-auth-token')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  addOrder,
  getOrdersByCustomerID,
  getOrdersByOrderID,
} = require('../controllers/orderController.js')

router.route('/add').post(addOrder)
router.route('/getOrderByCustomer/:id').get(getOrdersByCustomerID)
router.route('/getOrderDetailsByOrderID/:id').get(getOrdersByOrderID)
module.exports = router
