const Post=require('../models/post');
const Comment=require('../models/comments');

module.exports.create=async function(req,res){
    try{
        const post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        
        req.flash('success','Post Created');
        
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

//to delete post and all the comments on the post
module.exports.destroy=async function(req,res){
    const post=await Post.findById(req.params.id);
    try{
        //.id will convert the id of the user into string
        //For authentication(loged in user and user who posted this post are same or not)
        if(post.user.toString()==req.user.id){
            post.deleteOne();
            req.flash('success','Post Deleted');
            try{
                //All the comments which are associted with this post will be deleted.
                await Comment.deleteMany({post:req.params.id});
                console.log('comment deleted');
                return res.redirect('back');
                }
            catch(err){
                console.log('Error in deleting comments');
                return res.redirect('back');
            }
        }else{
            req.flash('error','Sign-in First');
            return res.redirect('back');
            
        }
    }
    catch(err){ 
        req.flash('error',err);
        return res.redirect('back');
    }
}
