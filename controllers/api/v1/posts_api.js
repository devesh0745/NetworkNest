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
    console.log('user',req.user);
    try{
        //Autherization
        let post=await Post.findById(req.params.id);
      //  console.log('post',post);
        if(post.user.toString()==req.user.id){
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
                return res.json(401,{
                    message:'Error in deleting this Post'                })
            }
        }else{
            return res.json(401,{
            message:"Please sign-in first" 
           })
            
        }
    }
    catch(err){ 
        console.log(err);
        return res.json(500,{
            message:"Internal Sever Error!"
        });
        
    }
}
