const generateToken = require('../utils/generateToken.js')
const User = require('../models/userModel')

const db = require('../dbCon')
const mysql = require('mysql')

const registerUser = async (req, res) => {
  try {
    const userName = req.body.userName
    const userEmailID = req.body.userEmailID
    const userPassword = req.body.userPassword

    const userExists = await User.findOne({ userEmailID: userEmailID })

    if (userExists) {
      res.status(401).json({
        message: 'User already exists',
      })
    } else {
      const newUser = {
        userName: userName,
        userEmailID: userEmailID,
        userPassword: userPassword,
        userPhoneNumber: '',
        userStreet: '',
        userCity: '',
        userCountry: '',
        userZipCode: '',
        userDateOfBirth: '',
        userImage: '',
        userAbout: '',
      }
      const user = await User.create(newUser)
      if (user) {
        res.status(201).json({
          message: 'User Created Successfully!!',
        })
      }
    }
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error')
  }
}

const addUser = (req, res) => {
  const Name = req.body.userName
  const EmailID = req.body.userEmailID
  const Password = req.body.userPassword
  const sqlInsert =
    'INSERT INTO user (userName,userEmailID,userPassword) VALUES (?,?,?)'
  const sqlSearch =
    'SELECT * FROM user WHERE (userName = ?) OR (userEmailID = ?)'
  try {
    db.query(sqlSearch, [Name, EmailID], (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
        })
      }
      if (result.length !== 0) {
        res.status(401).json({
          message: 'User Already Exists!',
        })
      } else {
        db.query(sqlInsert, [Name, EmailID, Password], (err, result) => {
          if (err) {
          }
          res.status(401).json({
            message: 'User Successfully Signed Up!',
          })
        })
      }
    })
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

const test = async (req, res) => {

  const userEmailID = req.body.userEmailID
  const userPassword = req.body.userPassword
  const user = await User.findOne({ userEmailID: userEmailID })
  try {
    if (user) {

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
      res.status(200).json({results: result})
    } else {
      const err = {
        "error" : "Invalid emailId/password!"
      }
      res.status(400).json(err)
    }
  } catch (error) {
    const err = {
      "error" : "Internal Server Error!"
    }
    res.status(500).json(err)
  }

}

const getUserProfile = async (req, res) => {
  console.log(req.params.cust_id)
  const user = await User.findById(req.params.cust_id)
  if (user) {
    res.json({
      _id: user._id,
      userEmailID: user.emailId,
      userName: user.userName,
      userPhoneNumber: user.userPhoneNumber,
      userStreet: user.userStreet,
      userCity: user.userCity,
      userCountry: user.userCountry,
      userZipCode: user.userZipCode,
      userDateOfBirth: user.userDateOfBirth,
      userImage: user.userImage,
      userAbout: user.userAbout,
    })
  } else {
    res.status('404')
    throw new Error('user Not Found. Please try again')
  }
}

const updateUserProfile = async (req, res) => {
  const {
    user_ID,
    userName,
    userEmailID,
    userPhoneNumber,
    password,
    userStreet,
    userCity,
    userCountry,
    userZipCode,
    imageUrl,
  } = req.body
  console.log(req.body)
  const user = await User.findById(user_ID)
  if (user) {
    user.userName = userName || user.userName
    user.userEmailID = userEmailID || user.userEmailID
    user.userPhoneNumber = userPhoneNumber || user.userPhoneNumber
    user.userStreet = userStreet || user.userStreet
    user.userCity = userCity || user.userCity
    user.userCountry = userCountry || user.userCountry
    user.userZipCode = userZipCode || user.userZipCode
    user.userImage = imageUrl || user.userImage

    const updatedUser = await user.save()
    res.json({
      id: user_ID,
      userName: updatedUser.userName,
      userEmailID: updatedUser.userEmailID,
      userPhoneNumber: updatedUser.userPhoneNumber,
      userStreet: updatedUser.userStreet,
      userCity: updatedUser.userCity,
      userCountry: updatedUser.userCountry,
      userZipCode: updatedUser.userZipCode,
      favourites: updatedUser.favourites,
    })
  } else {
    res.status(400).send('User does not Exist!')
  }
}

const addFavourite = async (req, res) => {

  try {
    const userID = req.params.user_id
    const prodID = req.params.prod_id
    const user = await User.findById(userID)
    if (user) {
      user.favourites.push(prodID)
      const result = await user.save()
      if (result) {
        res.status(200).json({results: result})
      } else {
        const err = {
          "error": "Invalid USERID"
        }
        res.status(400).json(err)
      }
    }
  } catch (error) {
    const err = {
      "error": "Internal Server Error!"
    }
    res.status(500).json(err)
  }


}








//   const userID = req.params.user_id
//   const prodID = req.params.prod_id
//   const user = await User.findById(userID)
//   if (user) {
//     user.favourites.push(prodID)
//     console.log(user)
//     const result = await user.save()
//     if (result) {
//       res.status(200).json({
//         message: 'success',
//       })
//     } else {
//       res.status('500')
//       throw new Error('Request Failer with status code 500.')
//     }
//   } else {
//     res.status('404')
//     throw new Error('user Not Found. Please try again')
//   }
// }

const getUserFavourites = async (req, res) => {
  const userID = req.params.cust_id
  const user = await User.findById(userID)
  if (user) {
    const result = user.favourites
    if (result) {
      res.status(200).json({
        result,
      })
    } else {
      res.status('500')
      throw new Error('Request Failed with status code 500.')
    }
  }
}

module.exports = {
  addUser,
  test,
  getUserProfile,
  updateUserProfile,
  addFavourite,
  getUserFavourites,
  registerUser,
}
