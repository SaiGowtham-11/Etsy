const express = require('express')
const router = express.Router()
const {
  checkShopName,
  addShop,
  getShopDetails,
} = require('../controllers/shopController')

router.post('/checkShop', checkShopName)
router.post('/addShop', addShop)
router.get('/shopDetails/:userId', getShopDetails)

module.exports = router
