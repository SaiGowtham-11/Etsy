const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const { errorMonitor } = require('stream')
const Order = require('../models/orderModel')

const addOrder = async (req, res) => {
  const items_array = req.body.orderItems
  const user_id = req.body.user
  const orderTotal = req.body.totalPrice
   console.log(req)

  const order = new Order({
    user: user_id,
    orderItems: items_array,
    totalPrice: orderTotal,
  })
  const createdOrder = await Order.create(order)
  if(createdOrder){
    res.status(200).json({results: createdOrder})
  }else{
    res.status(200).json({message: 'Order Failed'})
  }
}

const getOrdersByCustomerID = async (req, res) => {

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

const getOrdersByOrderID = async (req, res) => {
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

module.exports = { addOrder, getOrdersByCustomerID, getOrdersByOrderID }
