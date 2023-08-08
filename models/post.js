const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        //Now it will store the id of the user whoever will post.
        type:mongoose.Schema.Types.ObjectId,
        //refer to which schema
        ref:'User'
    },
    comments:[
        {
        //Now it will store the id's of all the comments in this post schema itself.
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
        }
    ]
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);

module.exports=Post;