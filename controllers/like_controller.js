const Post=require('../models/post');
const Comment=require('../models/comments');
const Like=require('../models/like');

module.exports.createLikePost=async function(req,res){
    try{
        if(req.user){
            const post=await Post.findById(req.body.post);
            console.log('post:',post);
            //All the post user has liked.
            const likeUser=await Like.find({user:req.user._id});
            //check if user has liked a post or not.
            let obj = likeUser.find(o => o.likeable.toString() === post.id);
            if(obj){
                
                try{
                    //It will delete the like from the likes array in post
                    const pullLike=await Post.findByIdAndUpdate(obj.likeable,{$pull:{likes:obj._id}});
                    //Will delete like from the like schema.
                    const like=await Like.findByIdAndDelete(obj._id)
                    req.flash('success','Like Removed');
                    return res.redirect('back');
                }catch(err){
                    console.log('error:',err);
                }
                
            }else{
                const like=await Like.create({
                    user:req.user._id,
                    likeable:req.body.post,
                    onModel:'Post'
            })
            post.likes.push(like)
            post.save();
            req.flash('success','Post Liked');
            return res.redirect('back');
        }
       
    }
        
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.createLikeComment=async function(req,res){
    try{
        if(req.user){
            const comment=await Comment.findById(req.body.comment);
            const likeUser=await Like.find({user:req.user._id});
            let obj = likeUser.find(o => o.likeable.toString() === comment.id);
            if(obj){
                try{
                    //It will delete the like from the likes array in comment
                    const pullLike=await Comment.findByIdAndUpdate(obj.likeable,{$pull:{likes:obj._id}});
                    //Will delete like from the like schema.
                    const like=await Like.findByIdAndDelete(obj._id)
                    req.flash('success','Like Removed');
                    return res.redirect('back');
                }catch(err){
                    console.log('error:',err);
                }
                
            }else{
                const like=await Like.create({
                    user:req.user._id,
                    likeable:req.body.comment,
                    onModel:'Comment'
            })
            comment.likes.push(like)
            comment.save();
            req.flash('success','Comment Liked');
            return res.redirect('back');
        }
        
    }
    }catch(err){
        req.flash('error');
        return res.redirect('back');
    }
}