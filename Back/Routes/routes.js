const router = require("express").Router()
const userController = require('../User/userController')
const commentController = require('../Comment/commentController')
const postController = require('../Post/postController')
const middleware = require('../middleware/middleware')
router.get('/', (req, res) => {

    res.json('Api is working')

});


// user routes
router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.login)
// comments routes
router.post('/comment/create', middleware.authenticate, commentController.createComment);

//post routes
router.post('/post/create', middleware.authenticate, postController.createPost);


module.exports = router