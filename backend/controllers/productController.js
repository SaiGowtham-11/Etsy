const db = require('../dbCon')
const mysql = require('mysql')
const Product = require('../models/productModel')
const kafka = require('../kafka/client')



const getProducts = async (req, res) => {
  const keyword = req.query.Keyword

  kafka.make_request('etsy_getProducts', req.query, (err,results) => {
    if(err){
      res.status(500).json({
        error : err
      })
    }
    else{
      res.status(200).json(results)
    }
  })
}

const getSpecificProduct = async (req, res) => {
  const productID = req.params.id

  const product = await Product.findOne({ _id: productID })
  try {
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(201).json({
        message: 'No Products Available',
      })
    }
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

const addProduct = async (req, res) => {
  console.log(req.body)
  const productName = req.body.productName
  const productImage = req.body.productImage
  const productCategory = req.body.productCategory
  const productDescription = req.body.productDescription
  const productQuantity = req.body.productQuantity
  const productPrice = req.body.productPrice
  const shopId = req.body.shopID
  try {
    const product = new Product({
      name: productName,
      image: productImage,
      category: productCategory,
      description: productDescription,
      countInStock: productQuantity,
      price: productPrice,
      shop: shopId,
    })

    const createdProduct = await Product.create(product)
    if (createdProduct) {
      res.status(201).json({
        message: 'Product Added Successfully',
      })
    } else {
      res.status(400).json({
        message: 'Product Not Added Successfully',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const getProductsbyShopID = async (req, res) => {
  const shopId = req.params.shopID

  const products = await Product.find({ shop: shopId })

  try {
    if (products) {
      res.status(201).json({
        products,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts,
  getSpecificProduct,
  addProduct,
  getProductsbyShopID,
}
