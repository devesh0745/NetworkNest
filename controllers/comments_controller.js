const Comment=require('../models/comments');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        const post=await Post.findById(req.body.post);
        if(post){
            try{
            const comment=await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
                });
                //It will push the comment in post(comment array)
                post.comments.push(comment);
                //whenever update is done then we need to save the final result.
                post.save();

                console.log("comment created");
                return res.redirect('/');
            }
            catch(err){
                console.log("Error in creating comment!");
            }
            
        }
        
        return res.redirect('back');
    }
    catch(err){
        console.log("Error in commenting!");
        res.redirect('/');
    }
}
