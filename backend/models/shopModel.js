const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopSchema = new Schema(
  {
    shopName: { type: String, required: true },
    shopImage: { type: String },
    //Product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Shop = mongoose.model('Shop', shopSchema)
module.exports = Shop
