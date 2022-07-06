require('dotenv').config()
const express = require('express')

const { connectDb } = require('./config/db')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3002

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

try {
    connectDb()
} catch (err) {
    console.log(err);
}

app.listen(port, () => {
    console.log(`App run on port:${port}`);
})
