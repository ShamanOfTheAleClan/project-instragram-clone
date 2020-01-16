const router = require("express").Router()
const userController = require('../User/userController')
const middleware = require('../middleware/middleware')
const multer = require('multer');

router.get('/', (req, res) => {

    res.json('Api is working')

});

//file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'Back/uploadedFiles/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({
  storage: storage
})



// user routes
router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.login);
router.post('/user/uploadFile', middleware.authenticate, upload.single('avatar'), userController.uploadFile);





module.exports = router