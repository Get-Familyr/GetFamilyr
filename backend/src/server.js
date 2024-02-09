const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri).then(() => console.log('db connect'));

const db = require('./models');

const app = express();

const User = db.user;

function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: MongoStore.create({ mongoUrl: mongoUri }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.enable('trust proxy') 

module.exports = app