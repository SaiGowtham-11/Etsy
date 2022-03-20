const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const { errorMonitor } = require('stream')

const addOrder = async (req, res) => {
  let { user_id, orderDate, orderStatus, items_array, orderTotal } = req.body
  console.log(orderTotal)
  /* Delete this if fails ****/
  if (!req.userAuth) {
    res.status(404).json({
      message: ' Not Authorized',
    })
  }
  db.commit((err) => {
    if (err) {
      res.status(500).json({
        message: ' Internal Server Error',
      })
    }
    db.beginTransaction((err) => {
      if (err) {
        res.status(500).json({
          message: ' Internal Server Error',
        })
      }
      let sql1 =
        'INSERT INTO `order` \
          (`orderDate`, `orderStatus`, `orderTotal`, `user_id`) VALUES \
          (?,?, ?, ?)'
      const Queryparams1 = [orderDate, orderStatus, orderTotal, user_id]
      db.query(sql1, Queryparams1, (err) => {
        if (err) {
          res.status(500).json({
            message: ' Internal Server Error',
          })
        }

        db.query('SELECT LAST_INSERT_ID() as last_id', (err, result) => {
          if (err) {
            res.status(500).json({
              message: ' Internal Server Error',
            })
          }
          var last_id = result[0].last_id
          let errorFlag = false
          for (let i = 0; i < items_array.length; i++) {
            let sql =
              'INSERT INTO `order_details` \
                                                  ( `order_orderID`,\
                                                      `products_productID`, \
                                                  `order_price`,\
                                                  `order_quantity`\
                                                    ) \
                                                  VALUES \
                                                  (\
                                                  ?, \
                                                  ?, \
                                                  ?, \
                                                  ? );'
            const Queryparams = [
              last_id,
              items_array[i].product,
              items_array[i].price,
              items_array[i].qty,
            ]
            db.query(sql, Queryparams, (err, result) => {
              //console.log(Queryparams)
              if (err) {
                console.log(err)
                db.rollback((err) => {
                  errorFlag = true
                })
                return
              }
              //console.log(result)
            })
          }
          if (!errorFlag) {
            db.commit()
            //db.end()
            res.status(200).json({
              message: 'Success',
            })
          } else {
            res.status(500).json({
              message: 'Internal Server Error',
            })
          }
        })
      })
    })
  })
}
const getordersByCustomerID = async (req, res) => {
  let sql = "SELECT * FROM `order` WHERE user_id ='" + req.params.id + "'"
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

const getordersByOrderID = async (req, res) => {
  let sql =
    "SELECT * FROM `order_details` WHERE order_orderID ='" + req.params.id + "'"
  db.query(sql, (err, result) => {
    if (err) {
      console.log('Error in getordersByOrderID')
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
