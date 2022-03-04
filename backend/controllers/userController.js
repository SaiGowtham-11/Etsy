const generateToken = require('../utils/generateToken.js')

const db = require('../dbCon')
const mysql = require('mysql')

const addUser = (req, res) => {
  const Name = req.body.userName
  const EmailID = req.body.userEmailID
  const Password = req.body.userPassword
  const sqlInsert =
    'INSERT INTO user (userName,userEmailID,userPassword) VALUES (?,?,?)'
  const sqlSearch = 'SELECT * FROM user WHERE userEmailID = ? '
  try {
    db.query(sqlSearch, [EmailID], (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
        })
      }
      if (result.length !== 0) {
        res.json({
          message: 'User Already Exists!',
        })
      } else {
        db.query(sqlInsert, [Name, EmailID, Password], (err, result) => {
          if (err) {
            console.log('err ')
          }
          res.json({
            message: 'Sign up Sucessfull',
          })
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}
const test = (req, res) => {
  const EmailID = req.body.userEmailID
  const Password = req.body.userPassword
  //const Hashedpassword = crypto.createHash('sha256').update(password).digest('base64')
  const sqlSearch = 'SELECT * FROM user WHERE userEmailID = ? '
  db.query(sqlSearch, [EmailID], (err, result) => {
    if (err) {
      res.status(400).json({
        message: err,
      })
    }
    if (result.length === 1) {
      //console.log(result[0].password+"|"+Hashedpassword)
      console.log(result)
      if (result[0].userPassword === Password) {
        res.json({
          _id: result[0].userID,
          userName: result[0].userName,
          userEmailID: result[0].userEmailID,
          //phone: result[0].phone,
          userStreet: result[0].userStreet,
          userCity: result[0].userCity,
          //State: result[0].State,
          userCountry: result[0].userCountry,
          userZipCode: result[0].userZipCode,
          userImage: result[0].userImage,
          token: generateToken(result[0].userID),
        })
      } else {
        res.status(401).json({
          message:
            "Email Id/ Password doesn't match. Please try again.,password does not match",
        })
      }
    } else {
      res.status(400).json({
        message:
          "Email Id/ Password doesn't match. Please try again., no results at all",
      })
    }
  })
}

const getUserProfile = async (req, res) => {
  if (req.userAuth) {
    db.query(
      'SELECT * FROM users WHERE userID =?',
      [req.userId],
      (err, result) => {
        if (err) {
          throw new Error(err)
        }
        if (result.length === 1) {
          //console.log(result[0])
          res.json({
            _id: result[0].userID,
            userName: result[0].userName,
            userEmailID: result[0].userEmailID,
            //phone: result[0].phone,
            userStreet: result[0].userStreet,
            userCity: result[0].userCity,
            //State: result[0].State,
            userCountry: result[0].userCountry,
            userZipCode: result[0].userZipCode,
            userImage: result[0].userImage,
          })
        } else {
          res.status(401)
          throw new Error('Error 401 - Not Authorized')
        }
      }
    )
  }
}

module.exports = { addUser, test, getUserProfile }
