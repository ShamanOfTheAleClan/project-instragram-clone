const path = require('path');

const express = require('express');

const router = express.Router();
const postRoutes = require('./post.routes');

const postsController = require('../controllers/posts.controller');

router.get('/', postsController.getPosts);

module.exports = router;
