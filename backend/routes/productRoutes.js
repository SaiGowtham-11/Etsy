const express = require('express')
const { products } = require('./products')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {
  getProducts,
  getSpecificProduct,
  addProduct,
  getProductsbyShopID,
} = require('../controllers/productController')

router.get('/getProductsbyShopID/:shopID', getProductsbyShopID) //Done

router.get('/', getProducts) // Done

router.get('/:id', getSpecificProduct) // done

router.post('/addProduct', addProduct) // done

module.exports = router
