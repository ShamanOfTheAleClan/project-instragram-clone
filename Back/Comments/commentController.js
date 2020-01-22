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
const getAllComments=async (req, res) => {
    try {
        let comments = await Comment.find().populate('user')
        res.json(comments)
    } catch (e) {
        res.status(400).json(e)
    }
}


module.exports = {
    createComment,
    getAllComments
}