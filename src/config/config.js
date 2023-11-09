const dotenv = require("dotenv")

dotenv.config({
     override : true ,
     path: __dirname + "/.env" 
})

const config = {
  PORT : process.env.PORT,
  SECRET: process.env.SECRET,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME
}


module.exports = config
