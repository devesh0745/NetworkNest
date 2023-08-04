const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assests'));

//Use before routes.
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setting up view engine
app.set('view engine','ejs');
//Same as Path
app.set('views','./views')


//mongo store is used to store the session cookie in the db
app.use(session({
    store:MongoStore.create({ 
        mongoUrl:"mongodb://0.0.0.0/AllSocial_development",
        autoRemove:'disabled',
    },
    async function(err){
        try{
            console.log('connect-mongodb status ok');
        }
        catch(err){
            console.log('error:',err);
        }
    }),
    name:'AllSocial',
    //TODO change the secret before deployment in production mode.
    //used to encrypt the cookie
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{ maxAge:(1000 * 60 * 100)}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



//use express router(('/' means any request)Any request that comes goes to routes)
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){console.log(`Error in running server:${err}`)};
    console.log(`Server running on port:${port}`);
})