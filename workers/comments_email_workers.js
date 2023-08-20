const queue=require('../config/kue');

const commentsMailer=require('../mailers/comments_mailers');
                                    //data is which is send to through the comment.
queue.process('emails', function(job,done){

    console.log("email worker running",job.data)
})