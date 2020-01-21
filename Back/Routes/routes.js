const router = require("express").Router()
const userController = require('../User/userController')
const middleware = require('../middleware/middleware')
const commentController=require('../Comments/commentController')
router.get('/', (req, res) => {

    res.json('Api is working')

});


// user routes
router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.login)
//comment routes
router.post('/comment/create',middleware.authenticate, commentController.createComment)


module.exports = router