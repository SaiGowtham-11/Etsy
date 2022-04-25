const kafka = require('../../../kafka/client')
const Order = require('../../../models/orderModel')

const handle_request = async (msg, callback) => {

    try{
        const pageSize = Number(msg.pageSize)
        const page = Number(msg.page)
        const count = await Order.countDocuments({'user': msg.userID})
        const userOrders = await Order.find({'user': msg.userID}).limit(pageSize).skip(pageSize * (page-1))

        if(userOrders){
            const result = {
                orders: userOrders,
                page: page,
                pages: Math.ceil(count/pageSize)
            }
            callback(null, result)
        }
        else{
            const err = {
                "error": "Orders Not Found!"
            }
            callback(err, null);
        }
    }
    catch(error){
        const err = {
            error: "Internal Server Error"
        }
        callback(err, null);
    }
}

exports.handle_request = handle_request