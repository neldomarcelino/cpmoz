module.exports = function(app){
    var forum = app.controllers.forum;
    app.get('/forum', forum.index);

}