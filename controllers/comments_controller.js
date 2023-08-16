const Comment=require('../models/comments');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailers');


module.exports.create=async function(req,res){
    try{
        const post=await Post.findById(req.body.post);
        if(post){
                let comment=await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
                });
                //It will push the comment in post(comment array)
                post.comments.push(comment);
                //whenever update is done then we need to save the final result.
                post.save();
                req.flash('success','Comment Created');
                comment=await comment.populate('user','name email');
                console.log('comment:',comment);
                //call comments mailer 
                commentsMailer.newComment(comment);
                console.log("comment created");
                return res.redirect('/');


            }
                
            req.flash('error','Sign-in first');
            return res.redirect('back');
    
            
        }
        
    catch(err){
        req.flash('error',err);
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
                req.flash('success','Comment deleted');
                return res.redirect('back');
            }
            catch(err){
                req.flash('error',err);
                return res.redirect('back');
            }
            
        }else{
            req.flash('error','Sign-in first');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}