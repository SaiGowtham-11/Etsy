const db = require('../dbCon')
const mysql = require('mysql')

const getProducts = (req, res) => {
  const keyword = req.query.keyword
  if (keyword === 'frame') {
    const sqlSearch =
      'SELECT * FROM products WHERE productName = "Glass photo frame"'
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
    } catch (error) {}
  } else {
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
    } catch (error) {}
  }
}

const getSpecificProduct = (req, res) => {
  const productID = req.params.id
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

const addProduct = (req, res) => {
  const productName = req.body.productName
  const productImage = req.body.productImage
  const productCategory = req.body.productCategory
  const productDescription = req.body.productDescription
  const productQuantity = req.body.productQuantity
  const productPrice = req.body.productPrice
  const shopId = req.body.shopId

  const sqlInsert =
    'INSERT INTO products (productName, productImage, productCategory, productDescription, productQuantity, productPrice, shopID) VALUES (?, ?, ?, ?, ?, ?, ?)'

  try {
    db.query(
      sqlInsert,
      [
        productName,
        productImage,
        productCategory,
        productDescription,
        productQuantity,
        productPrice,
        shopId,
      ],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.status(201).json({
            message: 'Product Added Successfully',
          })
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProducts, getSpecificProduct, addProduct }
