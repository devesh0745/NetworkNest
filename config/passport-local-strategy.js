const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//authenticaion using passport and tell passport to use local strategy.
passport.use(new LocalStrategy({
    usernameField:'email'
},
    //email and password are automatically passed.       
                       //done is callback function which report back to passport.
    async function(email,password,done){
        try{
            const user=await User.findOne({email : email});

            console.log(user.password);
            if(!user || user.password!= password){
                console.log('Invalid username or password');
                return done(null,false);
            }
            //found the user
            return done(null,user);
        }
        catch(err){
            console.log('Error in finding user --> Passport');
            return done(err);
            }
    }
));

//serielizing the user to decide which key is to be kept in the cookies.
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserielizing the user from the key in the session cookies.
passport.deserializeUser(async function(id,done){
    try{
        const user=await User.findById(id);
        return done(null,user);
    }
    catch(err){
        console.log('Error in finding user --> Passport');
        return done(err);
    }
})

//check if the user is authenticated and it act as a middleware.
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}


//whenever any request is comming in this middleware is called and is setting user to locals.
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contain the current signed in user from the session cookie and we are just sending it to the locals for the views.
        res.locals.user=req.user;
    }
    next();
}

module.exports = passport;