const mongoose = require('mongoose')


const likeSchema = new mongoose.Schema({
    likeBy : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users'
    }],
    likeContent : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Posts'
    }] 
})


let Like = mongoose.model('Likes', likeSchema)

module.exports = Like