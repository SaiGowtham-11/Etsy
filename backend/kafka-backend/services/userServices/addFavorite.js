const User = require('../../../models/userModel')
const kafka = require('../../../kafka/client')

const handle_request = async(msg, callback) => {

    try {
        const userID = msg.user_id
        const prodID = msg.prod_id
        const user = await User.findById(userID)
        if (user) {
            user.favourites.push(prodID)
            const result = await user.save()
            if (result) {
                callback(null, result)
            } else {
                const err = {
                    "error": "Invalid USERID"
                }
                callback(err, null)
            }
        }


    } catch (error) {
        const err = {
            "error": "Internal Server Error!"
        }
        callback(err, null)
    }
}

exports.handle_request = handle_request;