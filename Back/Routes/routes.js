const router = require("express").Router()
const userController = require('../User/userController')
const middleware = require('../middleware/middleware')
const commentController=require('../Comments/commentController')
const postController=require('../Post/postController')

router.get('/', (req, res) => {

    res.json('Api is working')

});


// user routes
router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.login)
//comment routes
router.post('/comment/create',middleware.authenticate, commentController.createComment)
//get all comments
router.get('/comment/getAllComments',middleware.authenticate, commentController.getAllComments)
//post routes
router.post('/post/create', middleware.authenticate, postController.createPost);
router.get('/post/getAllPosts',middleware.authenticate, postController.getAllPosts)

module.exports = router