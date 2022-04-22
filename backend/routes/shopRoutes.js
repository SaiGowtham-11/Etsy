const express = require('express')
const router = express.Router()
const {
  checkShopName,
  addShop,
  getShopDetails,
} = require('../controllers/shopController')

router.post('/checkShop', checkShopName) //Done
router.post('/addShop', addShop) //Done
router.get('/shopDetails/:userId', getShopDetails) //Done

module.exports = router
