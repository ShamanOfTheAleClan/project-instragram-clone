const Post  = require('./postModel')

const createPost = async (req,res) =>{
    console.log(req.user._id);
    let data = req.body
    let post = new Post()
    post.user = req.user._id
    post.postPic = data.postPic
    post.postDescription = data.postDescription

    try {
        let savedPost = await post.save()
        res.json(savedPost)
    } catch (e) {
        res.status(400).json(e)
    }
}

const getAllPosts=async (req, res) => {
    try {
        let posts = await Post.find()
        .populate('user')
        .populate({
           path: "comments",
         options: {limit:5},
         populate: { path: 'user' }
         })
        
       
        res.json(posts)
    } catch (e) {
        res.status(400).json(e)
    }
}

module.exports = {
    createPost,
    getAllPosts
}
    
