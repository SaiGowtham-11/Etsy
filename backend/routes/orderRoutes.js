const express = require('express')
//const auth = require('registry-auth-token')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  addOrder,
  getordersByCustomerID,
  getordersByOrderID,
} = require('../controllers/orderController.js')

router.route('/add').post(addOrder)
router.route('/getOrderByCustomer/:id').get(getordersByCustomerID)
router.route('/getOrderDetailsByOrderID/:id').get(getordersByOrderID)
module.exports = router
