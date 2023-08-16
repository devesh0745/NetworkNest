const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

console.log('Google strategy running');
//tell passport to use new strategy for google login. 
passport.use(new googleStrategy({
    clientID:'152032193276-rrmheg00sqbs8ob6e2llj62a61o45pa9.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
},
    //google genertate this access token,//refreshToken is that when this access token expires it will refresh this access token.
    async function(accessToken,refreshToken,profile,done){

        try{
            
        //find the user
        const user=await User.findOne({email:profile.emails[0].value}).exec();
        if(user){
        //    console.log("********google auth user:",user);
            console.log('profile',profile);
            //if found, set this user as req.user(means sign-in)
            return done(null,user);
            }
        else{
            //if not found, create a user and set it as req.user.
            const user=await User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
                })
                
                if(user){
                    return done(null,user);
                    }
                else{
                    console.log('error in creating user',err);
                    return;
                }

            }
        }
        catch(err){
            console.log("error in google strategy passport",err);
            return;
        }

    }

));






module.exports= passport;