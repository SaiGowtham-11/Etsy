const express = require('express')
const router = express.Router()
const { checkShopName, addShop } = require('../controllers/shopController')

router.post('/checkShop', checkShopName)
router.post('/addShop', addShop)

module.exports = router
