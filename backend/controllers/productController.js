const db = require('../dbCon')
const mysql = require('mysql')

const getProducts = (req, res) => {
  //   const Name = req.body.userName
  //   const EmailID = req.body.userEmailID
  //   const Password = req.body.userPassword
  //   const sqlInsert =
  //     'INSERT INTO user (userName,userEmailID,userPassword) VALUES (?,?,?)'
  const sqlSearch = 'SELECT * FROM products'
  try {
    db.query(sqlSearch, (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
        })
      }
      if (Array.isArray(result) && result.length !== 0) {
        res.json({
          result,
        })
      } else {
        res.json({
          message: 'No Products Available',
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const getSpecificProduct = (req, res) => {
  const productID = req.params.id
  console.log(productID)
  const sqlSearch = 'SELECT * FROM products where productID = ?'
  try {
    db.query(sqlSearch, [productID], (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
        })
      }
      if (result.length !== 0) {
        res.json({
          result,
        })
      } else {
        res.json({
          message: 'No Products Available',
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProducts, getSpecificProduct }
