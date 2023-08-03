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
module.exports.create=function(req,res){
    //TODO LATER
}

//Get the sign-in data
module.exports.createSession=function(req,res){
    //TODO LATER
}