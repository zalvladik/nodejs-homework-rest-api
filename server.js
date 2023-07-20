import app from './app.js'
import mongoose from 'mongoose'

mongoose.set('strictQuery', true)
const DB_HOST = "mongodb+srv://ek11vladislav:rm4hoHhXoCnAfpGE@cluster0.kyiu4w8.mongodb.net/db-contacts?retryWrites=true&w=majority"
mongoose.connect(DB_HOST)
  .then(() => 
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  }), console.log('connect DB_HOST'))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })


