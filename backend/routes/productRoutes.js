const express = require('express')
const { products } = require('./products')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {
  getProducts,
  getSpecificProduct,
} = require('../controllers/productController')

router.get('/', getProducts)

router.get('/:id', getSpecificProduct)

module.exports = router
