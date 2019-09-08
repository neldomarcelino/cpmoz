module.exports = function(app){
    var forumController = {
        index: function(req, res){
            res.render('forum/index');
        }

    };
    return forumController;
}