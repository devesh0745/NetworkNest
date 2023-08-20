const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        //Now it will store the id of the user whoever will comment
        type:mongoose.Schema.Types.ObjectId,
        //refer to which schema
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        //refer to which schema
        ref:'Post'
    },
    likes:[
        {
        type:mongoose.Schema.ObjectId,
        ref:'Like'
        }
    ]
},{
    timestamps:true
});

const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment;