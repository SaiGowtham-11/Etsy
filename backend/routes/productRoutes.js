const express = require('express')
const { products } = require('./products')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {
  getProducts,
  getSpecificProduct,
  addProduct,
} = require('../controllers/productController')

router.get('/', getProducts)

router.get('/:id', getSpecificProduct)

router.post('/addProduct', addProduct)

module.exports = router
