const Post=require('../models/post');
const User=require('../models/user');
const Friendship=require('../models/friendships');

module.exports.home= async function(req,res){
    try{
        //    console.log(req.cookies)
        //    res.cookie('user_id',65);
        //populate the user of each post
        const postList=await Post.find({})
                        .sort('-createdAt')
                        .populate('user')
                        .populate({
                        path:'comments',
                        populate:{
                        path:'user'
                        }}).exec();
        //console.log("*********post******:",postList);
        if(req.user){
            const userSendingReq=await User.findById({_id:req.user._id}).populate('friendships').exec();
            //now to req.user will have the populated friendships
            req.user=userSendingReq;
        }
        //To get all the users
        const users=await User.find({});
       // console.log('user:',req.user);
        return res.render('home',{
            title:'AllSocial',
            postList:postList,
            all_users:users,
            sendReq:req.user
            
          
        });
    
}

    catch(err){
        console.log("Error in displaying post!",err);
        return res.redirect('back');
    }
};

