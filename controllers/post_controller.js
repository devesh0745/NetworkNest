const Post=require('../models/post');
const Comment=require('../models/comments');

module.exports.create=async function(req,res){
    try{
        const post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        
        
        console.log("Post created");
        return res.redirect('back');
    }
    catch(err){
        console.log("Error in posting!");
        return;
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
            console.log('post deleted')
            try{
                //All the comments which are associted with this post will be deleted.
                Comment.deleteMany({post:req.params.id});
                console.log('comment deleted');
                return res.redirect('back');
                }
            catch(err){
                console.log('Error in deleting comments');
            }
        }else{
            alert('please login first');
            return res.redirect('back');
            
        }
    }
    catch(err){
        console.log('error in deleting post');
    }
}
