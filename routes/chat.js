module.exports = function(app){
    var chat = app.controllers.chat;
    var autentice = require('./../middleware/autentice');

    app.get('/openForum', autentice, chat.index);

}