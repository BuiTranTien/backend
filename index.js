const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000;
require('dotenv').config()
const cors = require('cors')


//middleware
app.use(express.json());
app.use(cors({
  origin:['http://localhost:5173'],
  credentials: true
}))

//routes
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require("./src/orders/order.route")
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats")


app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

async function main(params) {
  await mongoose.connect(process.env.DB_URL)
  
  app.use('/', (req, res) => {
    res.send('Hello World ehllo!')
  })
}

main().then(()=> console.log('mongodb connected succuess')).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})