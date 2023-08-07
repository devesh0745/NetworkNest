const Post=require('../models/post');

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
