const Post=require('../models/post');

module.exports.home= async function(req,res){
    try{
        //    console.log(req.cookies)
        //    res.cookie('user_id',65);
        //populate the user of each post
        const postList=await Post.find({})
                                 .populate('user')
                                 .populate({
                                    path:'comments',
                                    populate:{
                                        path:'user'
                                    }
                                 })
                                 .exec();
        
        return res.render('home',{
            title:'AllSocial',
            postList:postList
        });
    }
    catch(err){
        console.log("Error in displaying post!");
    }
};

