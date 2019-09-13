module.exports = function(io){
    var sockets = io.sockets;
    var crypto = require('crypto');
    var md5 = crypto.createHash('md5');
    var redis = require('redis').createClient();
    
    sockets.on('connection', function(client){
        var session = client.request.session;
        var user = session.user;
        var chat = client.handshake.headers.referer.split('/')[
            client.handshake.headers.referer.split('/').length-1
        ];
        
        client.on('chat', function(idChat){
            var idUser = user._id;
            client.join(idChat);
            client.join(idUser)

            redis.lrange(idChat, 0, -1, function(err, messages){
                messages.forEach(function(msg){
                    sockets.in(idUser).emit('send-client', msg);
                });
            });
        });
        
        // Envia o chat anterior somente para um cliente.
        client.on('userOnly', function(userId){
            
        });
        client.on('send-server', function(message){
          
            message = "<p> <span class='span'> Publicado por:" + user.name + " </span> <br><br>" + message + "</p>";
            
            redis.lpush(chat, message);
            
            client.emit("send-client", message);
            client.in(chat).emit('send-client', message);   
        });
        
        client.on('disconnect', function () {
            client.leave(chat);
        });
    });
}