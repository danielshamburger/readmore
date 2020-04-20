const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../authentication/authenticate');

const Post = require('../models/post');

router.get('/', (request, response, next) => {
    Post.find()
      .populate('user', 'fname')
      .exec()
      .then(docs => {
        console.log(docs);
        //   if (docs.length >= 0) {
        response.status(200).json(docs);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        response.status(500).json({
          error: err
        });
      });
});

router.post('/', authenticate, (request, response, next) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        user: request.body.user,
        description: request.body.description,
        isbn: request.body.isbn,
        rating: request.body.rating
    });
    post
        .save()
        .then(result => {
            response.status(201).json({
                message: "Success!",
                createdPost: result
            });
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                error: error
            });
        });
});

router.get('/:postId', (req, res, next) => {
    res.status(200).json({
        message: 'Post details',
        postId: req.params.postId
    });
});

router.delete("/:postId", (request, response, next) => {
    const id = request.params.postId;
    console.log('recieved delete request');
    
    Post.deleteOne({ _id: id })
      .exec()
      .then(result => {
        console.log(result);
        response.status(200).json({
            message: "Deletion successful"
        });
      })
      .catch(err => {
        console.log(err);
        response.status(500).json({
          error: err
        });
      });
  });

module.exports = router;