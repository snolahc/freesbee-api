const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/Users');
const bcrypt        = require('bcrypt');

passport.use(new LocalStrategy((login, password, next) => {
  User.findOne({ login }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }

    if (!foundUser) {
      next(null, false, { message: 'Incorrect username' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password' });
      return;
    }

    next(null, foundUser);
  });
}));
