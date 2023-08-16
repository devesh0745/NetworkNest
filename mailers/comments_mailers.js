//All comments related mails will be put up over here.

const nodeMailer=require('../config/nodemailer');

//whenever any new comment is made we need to call this. 
                    //it takes comment as an argument.
exports.newComment=async function(comment){
    try{
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/comments_mailers.ejs');    
    const info=await nodeMailer.transporter.sendMail({
        from:'sdevesh227@gmail.com',
        to:comment.user.email,
        subject:"New comment is published",
        html:htmlString
        
    });
    //info carries the info about the req that has been send.
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