const express = require('express');
const db = require('../models');

const router = express.Router();

const User = db.user;

exports.register = async (req, res, next) => {
  User.register(
    new User({ email: req.body.email }),
    req.body.password,
    (err) => {
      if (err) {
        console.log('error whie registering', err);
        return next(err);
      }

      console.log('registered');

      res.json({
        message: 'success',
      });
    }
  );
};
