const generateToken = require('../utils/generateToken.js')

const db = require('../dbCon')
const mysql = require('mysql')

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

const test = (req, res) => {
  const EmailID = req.body.userEmailID
  const Password = req.body.userPassword
  const sqlSearch = 'SELECT * FROM user WHERE userEmailID = ? '
  db.query(sqlSearch, [EmailID], (err, result) => {
    if (err) {
      res.status(400).json({
        message: err,
      })
    }
    if (Array.isArray(result) && result.length === 1) {
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
        message: "Email Id/ Password doesn't match. Please try again.",
      })
    }
  })
}

const getUserProfile = async (req, res) => {
  if (req.userAuth) {
    db.query(
      'SELECT * FROM user WHERE userID =?',
      [req.userId],
      (err, result) => {
        if (err) {
          throw new Error(err)
        }
        if (result.length === 1) {
          res.json({
            _id: result[0].userID,
            userName: result[0].userName,
            userEmailID: result[0].userEmailID,
            userPhoneNumber: result[0].userPhoneNumber,
            userStreet: result[0].userStreet,
            userCity: result[0].userCity,
            userCountry: result[0].userCountry,
            userZipCode: result[0].userZipCode,
            userDateOfBirth: result[0].userDateOfBirth,
            userImage: result[0].userImage,
            userAbout: result[0].userAbout,
          })
        } else {
          res.status(401)
          throw new Error('Error 401 - Not Authorized')
        }
      }
    )
  }
}

const updateUserProfile = async (req, res) => {
  if (req.userAuth) {
    db.query(
      'SELECT * FROM user WHERE userID =?',
      [req.userId],
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: ' Internal Server Error',
          })
        }

        let sql =
          'UPDATE `user` SET \
          `userPhoneNumber` = ? ,\
          `userDateOfBirth` = ? ,\
          `userCountry` = ?,\
          `userCity` = ?,\
          `userZipCode`= ?,\
          `userAbout`= ?,\
          `userStreet`= ?,\
          `userImage`= ?\
          WHERE (`userID` = ?)'

        let paramsArray = [
          req.body.userPhoneNumber,
          req.body.userDOB,
          req.body.userCountry,
          req.body.userCity,
          req.body.userZipCode,
          req.body.userAbout,
          req.body.userStreet,
          req.body.imageUrl,
          req.userId,
        ]
        db.query(sql, paramsArray, (err, result) => {
          if (err) {
            console.log(err)
            res.status(500).json({
              message:
                'Cannot update As the Email ID or Username Already exits',
            })
          } else {
            res.json({
              _id: req.userID,
              userName: req.body.userName,
              userEmailID: req.body.userEmailID,
              userPhoneNumber: req.body.userPhoneNumber,
              token: generateToken(req.userId),
            })
          }
        })
      }
    )
  } else {
    res.status(401).json({
      message: ' User Not Found!',
    })
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
}
