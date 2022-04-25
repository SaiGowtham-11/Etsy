const Product = require('../../../models/productModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {

  try{
      const Keyword = msg.Keyword
      ? {
              name: {
                  $regex: msg.Keyword,
                  $options: 'i',
              },
          }
          : {}

      const products = await Product.find({ ...Keyword })

      if (products) {
          callback(null, products)
      }else {

          const err = {
              "error" : "No Products Available"
          }
          callback(err, null)
      }
  }catch(error) {
      const err = {
          "error" : "Internal Server Error!"
      }
      callback(err, null)
  }
}


exports.handle_request = handle_request;