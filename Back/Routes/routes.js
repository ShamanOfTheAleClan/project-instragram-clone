const router = require("express").Router()
const userController = require('../User/userController')
const middleware = require('../middleware/middleware')
router.get('/', (req, res) => {

    res.json('Api is working')

});


// user routes
router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.login);
router.post('/user/uploadFile', middleware.authenticate, userController.uploadFile);





module.exports = router