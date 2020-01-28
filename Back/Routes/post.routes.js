const path = require('path');

const express = require('express');

const router = express.Router();
// const multer = require('multer');
// const upload = multer({ dest: '../data/images/' });

const postsController = require('../controllers/posts.controller');

router.get('/make-post', postsController.getAddPost);

router.post('/make-post', postsController.postAddPost);

module.exports = router;
