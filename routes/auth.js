const express = require("express");
const passport = require('passport');
const User = require("../models/User");
const nodemailer = require("nodemailer");

const authRoutes = express.Router();
const transport = nodemailer.createTransport({

  service: "Gmail",
  auth: {
    user: process.env.mailUser,
    pass: process.env.mailPass
  }
})

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 4;

//message string when there is error
let errMsg = "";

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser) => {
    if(err) {
      errMsg = " ERROR --> passport.authenticate "
      errorHandler( errMsg, next);
      return;
    } 
    else if(!theUser) {
      errMsg = "Log in failed";
      errorHandler( errMsg, next);
      return;
    } else if(!theUser.emailConfirmed) {
      const err = new Error();
      errMsg = "You must confirm your email address before you can log in";
      errorHandler( errMsg, next);
      return;
    } else {
      req.login(theUser, () => {
        theUser.encryptedPassword = undefined;
        res.json({theUser});
      });
    }
  })(req, res, next) 
});

//past
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const rol = req.body.role;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
