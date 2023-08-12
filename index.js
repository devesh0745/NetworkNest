const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportJWT=require('./config/passport-jwt-strategy');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

/*app.use(sassMiddleware({
    src:'/assests/scss',
    dest:'/assests/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));*/


app.use(express.urlencoded());

app.use(cookieParser());

//makes upload path available to the browser.
app.use('/uploads',express.static(__dirname + '/uploads'))

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

//Use after session because its uses session
app.use(flash());

app.use(customMware.setFlash);



//use express router(('/' means any request)Any request that comes goes to routes)
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){console.log(`Error in running server:${err}`)};
    console.log(`Server running on port:${port}`);
})