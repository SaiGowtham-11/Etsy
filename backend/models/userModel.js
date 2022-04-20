const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    userName: { type: String, reqired: true },
    userEmailID: { type: String, reqired: true, unique: true },
    userImage: { type: String },
    userDateOfBirth: { type: Date },
    userCity: {
      type: String,
    },
    userPassword: {
      type: String,
    },
    userCountry: {
      type: String,
    },
    userZipCode: {
      type: String,
    },
    userStreet: {
      type: String,
    },
    userCurrency: {
      type: Number,
    },
    userAbout: {
      type: String,
    },
    userPhoneNumber: {
      type: String,
    },
    userGender: {
      type: String,
    },
    userImage: {
      type: String,
    },
    favourites: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User
