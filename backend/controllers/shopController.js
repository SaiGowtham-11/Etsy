const db = require('../dbCon')
const mysql = require('mysql')

const Shop = require('../models/shopModel')
const checkShopName = async (req, res) => {
  const shopName = req.body.shopName

  try {
    const shopExists = await Shop.findOne({ shopName: shopName })
    if (shopExists) {
      res.status(401).json({
        message: 'Shop already exists',
      })
    } else {
      res.json({
        message: 'Available',
      })
    }
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error')
  }
}

const addShop = async (req, res) => {
  const shopName = req.body.shopName
  const shopImage = req.body.shopImage
  const userId = req.body.userId

  try {
    const shopExists = await Shop.findOne({ shopName: shopName })
    if (shopExists) {
      res.status(401).json({
        message: 'Shop already exists',
      })
    } else {
      const newShop = {
        shopName: shopName,
        shopImage: shopImage,
        user: userId,
      }
      const shop = await Shop.create(newShop)
      if (shop) {
        res.status(201).json({
          message: 'Shop Created Successfully!!',
        })
      }
    }
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error')
  }
}

const getShopDetails = async (req, res) => {
  const userId = req.params.userId
  const shop = await Shop.findOne({ user: userId })
  try {
    if (shop) {
      res.status(200).json(shop)
    } else {
      res.status(201).json({
        message: 'No Shop Found!',
      })
    }
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

module.exports = { checkShopName, addShop, getShopDetails }
