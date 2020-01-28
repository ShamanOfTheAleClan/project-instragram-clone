const Post = require('../models/posts.model');

const path = require('path');
const express = require('express');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, '../data/images/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const multer = require('multer');

// const fileFilter = (req, file, cb) => {
//   if (file.minitype === 'image/jpg' || file.minitype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

exports.getAddPost = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'posts.html'));
};

exports.postAddPost = (req, res, next) => {
  const title = req.body.title;
  // const addImg = req.body.path;
  const description = req.body.description;
  const hashtags = req.body.hashtags;
  const posts = new Post(title, description, hashtags);
  posts.save();
  res.sendFile(path.join(__dirname, '../', 'views', 'posted.html'));
};

exports.getPosts = (req, res, next) => {
  Post.fetchAll(posts => {
    res.sendFile(path.join(__dirname, '../', 'views', 'posted.html'));
  });
};

// const rp = require('request-promise');
// const cheerio = require('cheerio');

// let keyWord = 'developers';

// let URL = `https://www.instagram.com/explore/tags/${keyWord}/`;

// rp(URL)
//   .then(html => {
//     let hashtags = scrapeHashtags(html);
//     hashtags = removeDuplicates(hashtags);
//     hashtags = hashtags.map(ele => '#' + ele);
//     console.log(hashtags);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// const scrapeHashtags = html => {
//   var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
//   var matches = [];
//   var match;

//   while ((match = regex.exec(html))) {
//     matches.push(match[1]);
//   }

//   return matches;
// };

// const removeDuplicates = arr => {
//   let newArr = [];

//   arr.map(ele => {
//     if (newArr.indexOf(ele) == -1) {
//       newArr.push(ele);
//     }
//   });

//   return newArr;
//   ;
// };
