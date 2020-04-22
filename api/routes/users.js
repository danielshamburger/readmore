const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require('../authentication/authenticate');

const User = require("../models/user");

router.get('/list', (request, response, next) => {
    User.find()
        .select('_id email fname lname')
        .exec()
        .then(users => {
            if (users) {
                response.status(200).json({
                    message: "Here are the users",
                    users: users
                });
            } else {
                response.status(200).json({
                    message: "no users"
                });
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                error: error
            });
        });
})

router.post("/signup", (request, response, next) => {
  User.find({ email: request.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return response.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(request.body.password, 10, (err, hash) => {
          if (err) {
            return response.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: request.body.email,
              fname: request.body.fname,
              lname: request.body.lname,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                response.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                response.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (request, response, next) => {
  User.findOne({ email: request.body.email })
    .exec()
    .then(user => {
      if (user < 1) {
        return response.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(request.body.password, user.password, (err, result) => {
        if (err) {
          return response.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "12h"
            }
          );
          return response.status(200).json({
            message: "Auth successful",
            user: {
              userId: user._id,
              email: user.email
            },
            token: token
          });
        }
        response.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({
        error: err
      });
    });
});

router.delete("/:userId", authenticate, (request, response, next) => {
  User.remove({ _id: request.params.userId })
    .exec()
    .then(result => {
      response.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({
        error: err
      });
    });
});

router.get("/:userId", (request, response, next) => {
  User.findOne({ _id: request.params.userId })
    .select('_id fname lname')
    .exec()
    .then(user => {
      if (user < 1) {
        return response.status(404).json({
          message: "Couldn't find user"
        });
      }
      
      return response.status(200).json({
        message: "user found",
        user: user
      });
  });
});

module.exports = router;