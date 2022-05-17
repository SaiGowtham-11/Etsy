const express = require('express')
const dotenv = require('dotenv')
const { products } = require('./data/products')
const mysql = require('mysql')
const cors = require('cors')
const db = require('./dbCon')
const userRoutes = require('./Routes/userRoutes')
const productRoutes = require('./Routes/productRoutes')
const orderRoutes = require('./Routes/orderRoutes')
const shopRoutes = require('./Routes/shopRoutes')
const schema = require('./graphQL/index')
const { graphqlHTTP } = require('express-graphql')
dotenv.config()
db()


const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.use(express.json())

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
app.use('/api/orders', orderRoutes)
app.use('/api/shops', shopRoutes)

app.get('/', (req, res) => {
  res.send('API is running....')
})

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
