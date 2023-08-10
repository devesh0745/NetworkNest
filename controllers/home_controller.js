const Post=require('../models/post');
const User=require('../models/user');

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
        //To get all the users
        const users=await User.find({});
        return res.render('home',{
            title:'AllSocial',
            postList:postList,
            all_users:users
        });
    }
    catch(err){
        console.log("Error in displaying post!");
    }
};

