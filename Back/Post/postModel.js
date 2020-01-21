const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    postPic: {
        type: String,//bus saugomas URL?
        required: true,
    },
    postDescription: {
        type: String,
        required: true,
    },
    /*tags: [{
        type: String
    }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],*/
    //comments:[{type:mongoose.Schema.ObjectId, ref:'Comments'}],
})


let Post = mongoose.model('Posts', postSchema)

module.exports = Post