const Comment = require('./commentModel')
const Post = require('../Post/postModel')


const createComment = async (req, res) => {
    console.log(req.user);
    let data = req.body;
    let comment = new Comment();
    comment.comment = data.comment;
    comment.user = req.user._id;
    comment.post = data.postId;

    try {
        let saved = await comment.save();
       await Post.findByIdAndUpdate(data.postId, {$push:{comments:saved._id}})



        res.json(saved);

        //Posts.findById(req.params._id).populate("comments").exec(function (err, foundPost) {
            
        // foundPost.comments.push(comment);
         //foundPost.save();
       // });
    } catch (e) {
        res.json(e);
    }

}
const getAllComments = async (req, res) => {
    try {
        let comments = await Comment.find()
            .populate('user')
        // .populate('post')
        res.json(comments)
    } catch (e) {
        res.status(400).json(e)
    }
}


module.exports = {
    createComment,
    getAllComments
}