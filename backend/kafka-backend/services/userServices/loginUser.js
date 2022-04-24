const User = require('../../../models/userModel')
const kafka = require('../../../kafka/client')

const handle_request = async (msg, callback) => {

    const userEmailID = msg.userEmailID
    const userPassword = msg.userPassword
    const user = await User.findOne({ userEmailID: userEmailID })
    console.log("User Login Handle Request")
    try {
        if (user) {
            // Here We need to check the Password

            const result = {
                _id: user.userID,
                userName: user.userName,
                userEmailID: user.userEmailID,
                user_ID: user._id,
                userPhoneNumber: '',
                userStreet: '',
                userCity: '',
                userCountry: '',
                userZipCode: '',
                userDateOfBirth: '',
                userImage: '',
                userAbout: '',
            }
            callback(null, result)
        } else {
            const err = {
                "error" : "Invalid emailId/password!"
            }
            callback(err, null)
        }
    } catch (error) {
        const err = {
            "error" : "Internal Server Error!"
        }
        callback(err, null)
    }
}

exports.handle_request = handle_request;