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
      // Here We need to check the Password
      res.json({
        _id: user.userID,
        userName: user.userName,
        userEmailID: user.userEmailID,
        user_ID: user._id,
      })
    } else {
      res.status(400).json({
        error: "Invalid username/Password'",
      })
    }
  } catch (error) {
    res.status(400).json({
      error: "Invalid username/Password'",
    })
  }

  // db.query(sqlSearch, [EmailID], (err, result) => {
  //   if (err) {
  //     res.status(400).json({
  //       message: err,
  //     })
  //   }
  //   if (Array.isArray(result) && result.length === 1) {
  //     if (result[0].userPassword === Password) {
  //       res.json({
  //         _id: result[0].userID,
  //         userName: result[0].userName,
  //         userEmailID: result[0].userEmailID,
  //         //phone: result[0].phone,
  //         userStreet: result[0].userStreet,
  //         userCity: result[0].userCity,
  //         //State: result[0].State,
  //         userCountry: result[0].userCountry,
  //         userZipCode: result[0].userZipCode,
  //         userImage: result[0].userImage,
  //         token: generateToken(result[0].userID),
  //       })
  //     } else {
  //       res.status(401).json({
  //         message:
  //           "Email Id/ Password doesn't match. Please try again.,password does not match",
  //       })
  //     }
  //   } else {
  //     res.status(400).json({
  //       message: "Email Id/ Password doesn't match. Please try again.",
  //     })
  //   }
  // })
}

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.cust_id)
  if (user) {
    res.json({
      _id: user._id,
      userEmailID: user.userEmailID,
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
    id,
    userName,
    email,
    phone,
    password,
    Street,
    City,
    Country,
    ZipCode,
    image,
  } = req.body

  const user = await User.findById(id)
  if (user) {
    user.userName = userName || user.userName
    user.userEmailID = email || user.userEmailID
    user.userPhoneNumber = phone || user.userPhoneNumber
    user.userStreet = Street || user.userStreet
    user.userCity = City || user.userCity
    user.userCountry = Country || user.userCountry
    user.userZipCode = ZipCode || user.userZipCode
    user.userImage = image || user.userImage

    const updatedUser = await user.save()
    res.json({
      id: id,
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
  const userID = req.params.user_id
  const prodID = req.params.prod_id
  if (req.userAuth) {
    let sql =
      'INSERT INTO `favourites` (`user_id`, `product_id`) VALUES (?, ?);'
    db.query(sql, [userID, prodID], (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
        })
      } else {
        //console.log(result[0])
        res.status(200).json({
          message: 'success',
        })
      }
    })
  } else {
    res.status(401)
    throw new Error('Error 401 - Not Authorized')
  }
}

const getUserFavourites = async (req, res) => {
  if (req.userAuth) {
    let sql = 'SELECT * FROM `favourites` WHERE user_id = ?;'
    db.query(sql, [req.params.cust_id], (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
        })
      } else {
        res.status(200).json({
          result,
        })
      }
    })
  } else {
    res.status(401)
    throw new Error('Error 401 - Not Authorized')
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
