const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(cookieParser());

//Use before routes.
app.use(expressLayouts);



//extract style and scripts from sub pages into the layout.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assests'));


const db=require('./config/mongoose');

//use express router(('/' means any request)Any request that comes goes to routes)
app.use('/',require('./routes/index'));

//Setting up view engine
app.set('view engine','ejs');
//Same as Path
app.set('views','./views')

app.listen(port,function(err){
    if(err){console.log(`Error in running server:${err}`)};
    console.log(`Server running on port:${port}`);
})