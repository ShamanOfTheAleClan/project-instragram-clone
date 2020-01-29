const router = require("express").Router()
const userController = require('../User/userController')
const commentController = require('../Comments/commentController')
const postController = require('../Post/postController')
const middleware = require('../middleware/middleware')
const multer = require('multer');

router.get('/', (req, res) => {

    res.json('Api is working')

});

//file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Back/uploadedFiles/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let fileFilter = function (req, file, cb) {
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

let obj = {
    storage: storage,
    limits: {
        fileSize: 200 * 1024 * 1024
    },
    fileFilter: fileFilter
};



// user routes
router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.login)
//comment routes
router.post('/comment/create',middleware.authenticate, commentController.createComment)
//get all comments
router.get('/comment/getAllComments', middleware.authenticate, commentController.getAllComments)
//post routes
router.post('/post/create', middleware.authenticate, postController.createPost);
router.get('/post/getAllPosts',middleware.authenticate, postController.getAllPosts)
router.post('/user/login', userController.login);
router.post('/user/uploadFile', middleware.authenticate, multer(obj).single('avatar'), userController.uploadFile);





module.exports = router