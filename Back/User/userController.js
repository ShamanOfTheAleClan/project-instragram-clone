const User = require('./userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config');
const Post = require('../Post/postModel');


let registerUser = (req, res) => {
    let data = req.body
    let user = new User()

    user.username = data.username
    user.password = data.password
    user.email = data.email
    console.log(data.username)
    user.save().then((createdUser) => {
        res.json(createdUser)
    }).catch((e) => {
        res.status(400).json(e)
    })

}
const getAll = async (req, res) => {
    try {
        let users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(400).json(e)
    }
}

const getSingleUser = async (req, res) => {

    let id = req.params.id;
    try {
        let user = await User.findById(id)
        res.json(user)
    } catch (e) {
        res.status(400).json(e)
    }

}

const login = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        })
        if (!user) {
            res.json('no such user')
            return
        }
        bcrypt.compare(req.body.password, user.password, (err, response) => {
            if (response) {
                let access = 'auth'
                let token = jwt.sign({

                    _id: user._id.toHexString(),
                    access

                }, config.password).toString()
                user.tokens.push({
                    token,
                    access
                })
                user.save().then(() => {
                    res.header('x-auth', token).json(user)
                })
            } else {
                res.json('login failed')
            }
        })
    } catch (e) {
        res.status(400).json(e)
    }
}

const loadProfile = async (request, response) => {
    try {
        let user = await request.user
        let posts = await Post.find({user: user.id})
        console.log(posts);

        response.json(posts);
    } catch (e) {
        response.status(400).json(e);
    }
}


const uploadFile = async (request, response) => {

    if (!request.file) {
        return response.status(400).json('Failed to save file');
    }
    else {
        

        console.log('****************************************');
        console.log('Uploaded file: ', request.file);
        try {
            // console.log('################################');
            // console.log(request);
            // console.log('################################');
            let user = request.user;
            let filename = request.file.filename;
            let filepath = request.file.path;

            user.photos.push({
                filename,
                filepath
            });

            user.save();

            console.log('--------------------------');
            console.log('Uploaded by: ', user);
            console.log('****************************************');

            let post = new Post()
            post.user = request.user._id;
            post.postPic = filepath;
            post.postDescription = request.body.postDescription;

            let savedPost = await post.save();

            res.json(savedPost);
            // response.json(true);
        } catch (error) {
            response.status(400).json(error);
        }
    }
}


module.exports = {
    registerUser,
    getAll,
    getSingleUser,
    login,
    uploadFile,
    loadProfile,
}
