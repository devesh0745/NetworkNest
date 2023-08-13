const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
//It will extract jwt token from the header
const ExtractJWT=require('passport-jwt').ExtractJwt

const User=require('../models/user');

let opts={
    //it will extract jwt token from header.
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    //Used to decrypt the token.
    secretOrKey : 'AllSocial'
}

//Now it will tell passport to use jwt.//this call back function reads data from the jwt pay load.
passport.use(new JWTStrategy(opts,async function(jwtPayLoad,done){
    try{
    const user=await User.findById(jwtPayLoad._id);
    if(user){
        return done(null,user);
        }else{
            return done(null,false);
        }
    }
    catch(err){
        console.log("Error in finding user from JWT");
    }
}));

module.exports = passport;