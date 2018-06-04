const express   = require('express');
const People    = express.Router();
const Users     = require("../models/Users.js");

// Return the list of users
People.get("/people", (req, res, next) => {

      Users.find()
        .populate()
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          next(err);
        });
  });

module.exports = People;