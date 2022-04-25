
const kafka = require('../../../kafka/client')
const Order = require("../../../models/orderModel");

const handle_request = async(msg,callback) =>{
    console.log("HIIIIIIIIIII")
    console.log(msg)
    try{
        const items_array = msg.orderItems
        const user_id = msg.user
        const orderTotal = msg.totalPrice

        const order = new Order({
            user: user_id,
            orderItems: items_array,
            totalPrice: orderTotal,
        })
        const createdOrder = await Order.create(order)
        if(createdOrder){
            callback(null,createdOrder)
        }else{
            callback('Order Failed!', null)
        }
    }catch (error) {
        const err = {
            "error" : "Internal Server Error!"
        }
        callback(err, null)
    }

}
exports.handle_request = handle_request;