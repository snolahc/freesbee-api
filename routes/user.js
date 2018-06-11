const mongoose = require("mongoose");
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const User = require("../models/User");

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.mailUser,
        pass: process.env.mailPass
    }
});

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

function errorHandler(errMessage, next){
    const err = new Error(errMessage);    
    err.status = 400;
    next(err);
}

//Retrieve infos of one user
router.get("/:userId", (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        errorHandler("Invalid user ID", next);
    } else {
        User.findById(req.params.userId)
        .then(foundUser => {
            if(!foundUser) {
                next();
            } else {
                foundUser.password = undefined;
                res.json(foundUser);
            }
        })
        .catch(err => {
            next(err);
        });
    }
});

// POST PROFILE UPDATE
router.post("/:userId", (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        errorHandler("Invalid user ID", next);
    } else {
        User.findByIdAndUpdate (
            userId, 
            req.body, 
            { new: true })
            .then(user=>{
                res.json(user);
            })
            .catch(err => {
                next(err);
            });
        }
    });
    
    //Confirm email address, using get verb cause it has to be accessable from link in mail
    router.get("/mailconfirmation/:userId", (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            errorHandler("Invalid user ID", next);
        } else {
            User.findOne({ _id: req.params.userId }, (err, user) => {
                if (!user) {
                    errMsg = "No user id provided";
                    errorHandler(errMsg, next);
                    return;
                }
                if (user.accountActive === true) {
                    errMsg = "Signup already confirmed";
                    errorHandler(errMsg, next);
                    return;
                }
                User.findByIdAndUpdate(
                    req.params.userId,
                    { accountActive: true },
                    { new: true }
                )
                .then(user => {
                    req.login(user, () => {
                        user.encryptedPassword = undefined;
                        res.json({ theUser: user });
                    });
                })
                .catch(err => {
                    next(err);
                });
            });
        }
    });
    
    module.exports = router;
    