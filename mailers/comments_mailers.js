//All comments related mails will be put up over here.

const nodeMailer=require('../config/nodemailer');

//whenever any new comment is made we need to call this. 
                    //it takes comment as an argument.
exports.newComment=async function(comment){
    console.log("inside newComment nodemailer ");
    try{
    const info=await nodeMailer.transporter.sendMail({
        from:'sdevesh227@gmail.com',
        to:comment.user.email,
        subject:"<h1>New comment is now published</h1>"
        //info carries the info about the req that has been send.
    });
    if(info){
        console.log('message sent',info);
        return;
    }else{
        console.log('Error in sending mail',err)
        return;
    }
    
    /*(err,info)=>{
        console.log('info:',info);
        if(err){
            console.log('Error in sending mail',err)
            return;
        }
        console.log('message sent',info);
        return;
    });*/
    }
    catch(err){
        console.log('error in sending mail',err);
    }
}