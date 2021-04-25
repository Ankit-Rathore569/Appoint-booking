const { response } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Imports all router
const UserRouter = require("./routes/userRoutes")

app.use("/api/v1", UserRouter)

module.exports = app