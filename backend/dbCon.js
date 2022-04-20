const mongoose = require('mongoose')
const dotenv = require('dotenv')
//dotenv.config()
const db = async () => {
  try {
    // mongoose connect always returns a promise// hence await is required
    const con = await mongoose.connect(
      'mongodb+srv://saigoutham11:Gitam123@cluster0.il5t6.mongodb.net/Etsy?retryWrites=true&w=majority',
      { useUnifiedTopology: true, useNewUrlParser: true, maxPoolSize: 20 }
    )
    console.log(`Connected to DB ${con.connection.host}`)
  } catch (error) {
    console.log(`Connection Failed! ${error}`)
    process.exit(1)
  }
}

module.exports = db
