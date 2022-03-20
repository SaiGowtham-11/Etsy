const db = require('../dbCon')
const mysql = require('mysql')

const checkShopName = (req, res) => {
  const shopName = req.body.shopName
  const sqlSearch =
    'SELECT COUNT(shopName) AS shopCount FROM shops WHERE (shopName = ?)'

  try {
    db.query(sqlSearch, [shopName], (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
        })
      }
      console.log(result[0].shopCount)
      if (result[0].shopCount !== 0) {
        res.json({
          message: 'Shop name unavailable',
        })
      } else {
        res.json({
          message: 'Available',
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const addShop = (req, res) => {
  const shopName = req.body.shopName
  const shopImage = req.body.shopImage
  const userId = req.body.userId

  const sqlInsert =
    'INSERT INTO shops (shopName, shopImage, user_userID) VALUES (?, ?, ?)'

  try {
    db.query(sqlInsert, [shopName, shopImage, userId], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(201).json({
          message: 'Shop Created Successfully',
        })
      }
    })
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

module.exports = { checkShopName, addShop }
