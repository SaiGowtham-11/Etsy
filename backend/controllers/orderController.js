const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const { errorMonitor } = require('stream')
const Order = require('../models/orderModel')
const console = require('console')
const kafka = require('../kafka/client')

const addOrder = async (req, res) => {
   console.log(req)
  kafka.make_request('etsy_add_order',req.body, (err, results) => {
    if(err){
      res.status(500).json({
        error: err
      })
    }
    else{
      res.status(201).send(results)
    }
      })
}

const getordersByCustomerID = async (req, res) => {

  const userID = req.params.id
  const pageSize = req.query.pageSize || 2
  const page = req.query.page || 1

  /*kafka.make_request('get_user_orders', {pageSize, page, userID}, (err, results) => {
    if(err){
      res.status(500).json({
        error: err
      })
    }
    else{
      res.status(200).send(results)
    }
  })*/


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
