module.exports.chatSockets=function(socketServer){
    //io will have all the sockets.
    let io=require('socket.io')(socketServer);


    //it will emit that the connection is established and connectionHandler function will detects it on user side.
    io.sockets.on('connection', function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });

        //just like event handler in js it will catch the req from the user side
        socket.on('join_room',function(data){
            console.log('joining request received.',data);

            //it will join this chatroom if exist or create one if not exist. 
            socket.join(data.chatroom)

            //it will emit this inside the chatroom telling other user that someone has joined.
            io.in(data.chatroom).emit('user_joined',data);
        });

        //detect send_message and broadcast to everyone in the room.
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });
    });
}