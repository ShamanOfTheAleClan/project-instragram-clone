//const mongoose = require('mongoose');
const Comment= require('./commentModel')

const createComment = async(req, res) => {
    console.log(req.user);
    let data = req.body;
    let comment= new Comment();
    comment.comment=data.comment;
   comment.user=req.user._id;
    try{
        let saved = await comment.save();
        res.json(saved);
    }catch(e){
        res.json(e);
    }

}

module.exports = {
    createComment
}