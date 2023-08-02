const express=require('express');
const app=express();
const port=8000;
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
});
