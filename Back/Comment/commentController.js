const Comment  = require('./commentModel')

const createComment = async (req,res) =>{
    let data = req.body
    let comment = new Comment()
    //comment.post = req.post._id
    comment.user = req.user._id
    comment.comment = data.comment

    try {
        let savedComment = await comment.save()
        res.json(savedComment)
    } catch (e) {
        res.status(400).json(e)
    }
}

module.exports = {
    createComment
}