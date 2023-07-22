import app from './app.js'
import mongoose from 'mongoose'

const DB_HOST = 'mongodb+srv://zalipkav:9TgsfV1nxWrunKzq@cluster0.kv35tzz.mongodb.net/db-contacts?retryWrites=true&w=majority'

mongoose.set('strictQuery',true)
mongoose.connect(DB_HOST)
  .then(() => 
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  }), console.log('Database connection successful'))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })
