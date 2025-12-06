const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000;
require('dotenv').config()
const cors = require('cors')


// CORS middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://readly-frontend-lemon.vercel.app'
  ],
  credentials: true,
}))

// ROUTES
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require("./src/orders/order.route")
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)


// 👉 ĐÚNG: chỉ match "/", không match các route API
app.get('/', (req, res) => {
  res.send('Hello World ehllo!')
})

async function main() {
  await mongoose.connect(process.env.DB_URL)
}

main()
  .then(() => console.log('mongodb connected succuess'))
  .catch(err => console.log(err))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
