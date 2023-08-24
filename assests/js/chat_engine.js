//this class will send a req for connection
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        //io is a global variable given by socket.io cdn
        //It emit the connect event
        this.socket=io.connect('http://localhost:5000',{ transports : ['websocket'] });

        if(this.userEmail){
            console.log('working');
            this.connectionHandler();
        }
    }



    connectionHandler(){
        let self=this;

        //when first event is happened(connection).
        this.socket.on('connect',function(){
            console.log('connection established using sockets......!');

            //it will emit this req and will catch on server side.
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'AllSocial'
            });

            self.socket.on('user_joined',function(data){
                console.log('A user has joined',data);
            });
        })

        //send a message on clicking the send message button.
        $('#send-message').click(function(){

            let msg=$('#chat-message-input').val();
            console.log('msg:',msg);

            if(msg !=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'AllSocial'
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('message received:',data.message);

            let newMessage=$('<li>');
            let messageType='other-message';

            if(data.user_email==self.userEmail){
                messageType='self-message';
            }

            newMessage.append($('<span>',{
                'html':data.message
            }));

            newMessage.append($('<sub>',{
                'html':data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage)
        });

    }
}