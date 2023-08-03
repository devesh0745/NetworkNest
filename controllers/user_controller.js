const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"All Social"
    })
}

//Render sign-in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"All Social"
    })
}

//Render sign-up page
module.exports.signUp=function(req,res){
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
                const user=await User.create(req.body)
                return res.redirect('/users/sign-in')
                }
                catch(err){
                    console.log('error in creating user while signing up!')
                    }
                }
            else{
                return res.redirect('back');
            }
    }
    catch(err){
            if(err){console.log('error in finding user in signing up'); return}
        }
    }


//Get the sign-in data
module.exports.createSession=function(req,res){
    //TODO LATER
}