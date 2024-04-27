const User=require('../models/user');
const fs=require('fs');
const path=require('path');

//Render sign-in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title:"All Social"
    })
}

//Render sign-up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title:"All Social"
    })
}

//Get the sign up data
module.exports.create=async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try{
        const user=await User.findOne({email:req.body.email});
            if(!user){
            try{
                const user=await User.create(req.body);
                req.flash('success','Sign-up Successfuly');
                return res.redirect('/users/sign-in');
                }
            catch(err){
                req.flash('error','Sign-up again');
                return res.redirect('back');
                }
            }
        else{
            req.flash('error','Sign-up first');
            return res.redirect('back');
            }
    }
    catch(err){
            req.flash('error','Sign-up Again');
            return res.redirect('back');
        }
    }


//sign in and create session for the user.
module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfuly!');
    return res.redirect('/');
}

module.exports.profile=async function(req,res){
    try{
        const user=await User.findById(req.params.id);
        return res.render('user_profile',{
            title:'AllSocial',
            profile_user:user
        })
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

//To update a user.
module.exports.update=async function(req,res){
 
if(req.user.id==req.params.id){
    try{
            
           let user=await User.findById(req.params.id);
           //not using params because multer uses multipart and using uploadedAvatar because it will be able to read the request from multipart.
           User.uploadedAvatar(req,res,function(err){
           if(err){console.log("****multer error",err)}
            
           //it will update the name and email.
            user.name=req.body.name;
            user.email=req.body.email;

            if(req.file){

                if(user.avatar){
                    //So it will go to the avatar path and delete from there
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }

                //this is saving the path of the uploaded file into the avatar field into the user.
                user.avatar=User.avatarPath + '/' + req.file.filename;
                console.log('user',user);
            }
            user.save();
            return res.redirect('back');
           })
        }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}else{
    req.flash('error','unauthorized');
    return res.status(401).send('Unauthorized');
  }
}

//to log out
module.exports.destroySession=function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','Logged out Successfuly')
      return res.redirect('/');
    });
  };