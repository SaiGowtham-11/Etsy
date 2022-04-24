const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const { errorMonitor } = require('stream')
const Order = require('../models/orderModel')
const console = require('console')

const addOrder = async (req, res) => {
  const { items_array, user_id, orderTotal } = req.body
  if (items_array && items_array.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      user: user_id,
      orderItems: items_array,
      totalPrice: orderTotal,
    })
    const createdOrder = await Order.create(order)
    console.log('Order Created Successfully..:)')
    res.status(201).json(createdOrder)
  }
}

const getordersByCustomerID = async (req, res) => {
  const userID = req.params.id

  const orders = await Order.find({ user: userID })
  try {
    if (orders) {
      res.status(200).json(orders)
    } else {
      res.status(201).json({
        message: 'No orders Available',
      })
    }
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

const getordersByOrderID = async (req, res) => {
  const orderID = req.params.id

  const orders = await Order.findOne({ _id: orderID })
  try {
    if (orders) {
      res.status(200).json(orders)
    } else {
      res.status(201).json({
        message: 'No orders Available',
      })
    }
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}
const getordersBy = async (req, res) => {
  let sql = "SELECT * FROM `order` WHERE user_userID ='" + req.params.id + "'"
  db.query(sql, async (err, result) => {
    if (err) {
      res.status(500).json({
        error: '500 - internal Server error' + err,
      })
    } else {
      res.status(201).json({
        result: result,
      })
    }
  })
}

module.exports = { addOrder, getordersByCustomerID, getordersByOrderID }
