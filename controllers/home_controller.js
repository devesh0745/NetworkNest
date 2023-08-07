const Post=require('../models/post');
const User=require('../models/user');

module.exports.home= async function(req,res){
    try{
        //    console.log(req.cookies)
        //    res.cookie('user_id',65);
        //populate the user of each post
        const postList=await Post.find({}).populate('user').exec();
        
        return res.render('home',{
            title:'AllSocial',
            postList:postList
        });
    }
    catch(err){
        console.log("Error in displaying post!");
    }
};

