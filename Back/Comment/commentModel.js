const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    /*post: {
        type: mongoose.Schema.ObjectId, ref: 'Posts'
    },*/
    user: {
        type: mongoose.Schema.ObjectId, ref: 'Users',
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
    /*
    reply: {
        type: Boolean,
        default: false
    },
    parent: {
        type: mongoose.Schema.ObjectId, ref: "Comments"
    }
*/
})


let Comment = mongoose.model('Comments', CommentSchema)

module.exports = Comment