const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    //this defined the object id of the liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        //refPath defines the other property ie the type of the object.
        refPath:'onModel'
    },
    //this field is used to define the type of the liked object since this a dynamic reference.
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;