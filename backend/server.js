const express = require('express')
const dotenv = require('dotenv')
const { products } = require('./data/products')
const mysql = require('mysql')
const cors = require('cors')
const db = require('./dbCon')
const userRoutes = require('./Routes/userRoutes')
const productRoutes = require('./Routes/productRoutes')

dotenv.config()

const app = express()
app.use(express.json())

db.connect((err) => {
  if (err) {
    console.error(err.stack)
    return
  }
  console.log('Connected to DB' + db.threadId)
})

app.use(cors())

app.get('/insert', (req, res) => {
  db.query(
    'INSERT INTO user (userID,userName,userEmailID) VALUES (5,"Sai Baba","baba@gmail.com")',
    (err, result) => {
      if (err) {
        console.log(err)
      }

      res.send(result)
    }
  )
})

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
  res.send('API is running....')
})

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
