const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.ObjectId, ref: 'Posts'
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId, ref: 'Users'
    }
})


let Comment = mongoose.model('Comments', commentSchema)

module.exports = Comment