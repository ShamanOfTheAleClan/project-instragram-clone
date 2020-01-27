const path = require('path');

const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts.controller');

router.get('/make-post', postsController.getAddPost);

router.post('/make-post', postsController.postAddPost);

module.exports = router;
