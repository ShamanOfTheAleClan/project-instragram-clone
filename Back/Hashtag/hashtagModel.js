const mongoose = require('mongoose')


const tagSchema = new mongoose.Schema({
    type : String,
    posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Posts'
    }]
})


let Tag = mongoose.model('Tags', tagSchema)

module.exports = Tag