import app from './app.js'
import mongoose from 'mongoose'
import DB_HOST from './config.js'

mongoose.connect(DB_HOST)
  .then(() => 
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  }), console.log('connect DB_HOST'))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })


