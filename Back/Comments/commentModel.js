const mongoose = require('mongoose');
//const bcrypt= require('./node_modules/bcrypt');

const CommentSchema = new mongoose.Schema({
    // post: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Posts',
    //     //required: true
      
    //  },
    comment:{
        type:String,
        required:true
    },
    user:{
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'Users'
       
    }
    // reply: {
    //     type: Boolean,
    //     default: false
    // },
    // parent: {
    //     type: mongoose.Schema.ObjectId, ref: "Comment",
       
    // }
});



let Comment=mongoose.model('Comment',CommentSchema);

module.exports=Comment
