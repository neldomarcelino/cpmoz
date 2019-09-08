module.exports = function(io){
    var sockets = io.sockets;
    var crypto = require('crypto');
    var md5 = crypto.createHash('md5');

    sockets.on('connection', function(client){
        var session = client.handshake.session;
        //var user = session.user;
        console.log(session);
        client.on('send-server', function(message){
            
            /*client.get('sala', function(err, sala){
                var data = {sala: sala};
                client.broadcast.emit('new-message', data);
                sockets.in(sala).emit('send-client', message);
            });*/
            message = "<b>" + "dd" + ": </b>" + message + "<br>";
            client.emit("send-client", message);
            client.broadcast.emit('send-client', message);
        });
        client.on('join', function(sala){
            if(sala){
                sala = sala.replace('?', '');
            }else{
                var timestamp = new Date().toString();
                sala = md5.update(timestamp).digest('hex');
            }
            client.set('sala', sala);
            client.join(sala);
        });
        client.on('disconnect', function(){
            /*client.get('sala', function(err, sala){
                client.leave(sala);
            });*/
        });
    });
}