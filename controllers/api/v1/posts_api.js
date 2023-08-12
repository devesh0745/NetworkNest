const Post=require('../../../models/post');
const Comment=require('../../../models/comments');

module.exports.index=async function(req,res){
    const postList=await Post.find({})
                        .sort('-createdAt')
                        .populate('user')
                        .populate({
                        path:'comments',
                        populate:{
                        path:'user'
                        }
                             }).exec();
    return res.json(200,{
        v:'v1',
        message:'List of posts',
        posts:postList
    })
}

module.exports.destroy=async function(req,res){
    const post=await Post.findById(req.params.id);
    try{
        //if(post.user.toString()==req.user.id){
            post.deleteOne();
         //   req.flash('success','Post Deleted');
            try{
                //All the comments which are associted with this post will be deleted.
                await Comment.deleteMany({post:req.params.id});
                console.log('comment deleted');
                return res.json(200,{
                    message:"Post deleted and Comment associated with post deleted"
                });
                }
            catch(err){
               // console.log('Error in deleting comments');
                return res.redirect('back');
            }
       /* }else{
            req.flash('error','Sign-in First');
            return res.redirect('back');
            
        }*/
    }
    catch(err){ 
        return res.json(500,{
            message:"Internal Sever Error!"
        });
    }
}
