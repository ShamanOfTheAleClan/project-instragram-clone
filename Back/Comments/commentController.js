const Comment = require('./commentModel')
const Post = require('../Post/postModel')


const createComment = async (req, res) => {
    console.log(req.user);
    let data = req.body;
    let comment = new Comment();
    comment.comment = data.comment;
    comment.user = req.user._id;
    comment.username = req.user.username;
    comment.post = data.postId;

    try {
        let saved = await comment.save();
       await Post.findByIdAndUpdate(data.postId, {$push:{comments:saved._id}})
       
        res.json(saved);

     
    } catch (e) {
        res.json(e);
    }

}
const getAllComments = async (req, res) => {
    try {
        let comments = await Comment.find()
            .populate('user')
      
        res.json(comments)
    } catch (e) {
        res.status(400).json(e)
    }
}


module.exports = {
    createComment,
    getAllComments
}