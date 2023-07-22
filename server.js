import app from './app.js'
import mongoose from 'mongoose'
import app from "./app"

const {DB_HOST} = null

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
