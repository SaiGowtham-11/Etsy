const mysql = require('mysql')
const env = require('dotenv')
env.config()
const db = mysql.createConnection({
  host: 'database-1.clmncxwxxtec.us-east-1.rds.amazonaws.com',
  user: 'root',
  password: 'Gitam123456',
  database: 'test_schema',
})
module.exports = db
