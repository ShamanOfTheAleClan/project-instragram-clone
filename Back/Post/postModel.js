const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    postPic: {
        type: String,//bus saugomas URL?
        required: true,
    },
    postDescription: {
        type: String
    },
    tags: [{
        type: String
    }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    comments:[{type:mongoose.Schema.ObjectId, ref:'Comment'}]
})

let Post = mongoose.model('Posts', postSchema)

module.exports = Post