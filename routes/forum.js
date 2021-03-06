module.exports = function(app){
    var autentice = require('./../middleware/autentice');
    var forum = app.controllers.forum;

    app.get('/', forum.index);
    app.get('/foruns', forum.index);
    app.post('/newForum', autentice, forum.create);
    app.get('/openForum/:id', autentice, forum.openForum);
    //app.post('/searchForum', foru.searchForum );

}