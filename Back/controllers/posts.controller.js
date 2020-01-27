const Post = require('../models/posts.model');

const path = require('path');
const express = require('express');

const postsController = require('../controllers/posts.controller');

exports.getAddPost = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'posts.html'));
};

exports.postAddPost = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const posts = new Post(title, description);
  posts.save();
  res.sendFile(path.join(__dirname, '../', 'views', 'posted.html'));
};

exports.getPosts = (req, res, next) => {
  Post.fetchAll(posts => {
    res.sendFile(path.join(__dirname, '../', 'views', 'posted.html'));
  });
};
