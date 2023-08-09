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

module.exports.destroy=async function(req,res){
    try{
        const comment = await Comment.findById(req.params.id);
        if(comment.user.toString()==req.user.id){
             
            let postId=comment.post;

            comment.deleteOne();

            try{
                //It will pull the comment id from the comments array in post.
                const post=Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
                return res.redirect('back');
            }
            catch(err){
                console.log('Error in deleting comment from comments array!')
                return res.redirect('back');
            }
        }else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error in deleting the comment ');
        return res.redirect('back');
    }
}