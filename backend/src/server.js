const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const db = require('./models')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())


