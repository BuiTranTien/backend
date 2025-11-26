const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000;
require('dotenv').config()


//password vhzUERZmkKa79ttv


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