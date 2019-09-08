module.exports = function(){
    var chatController = {
        index: function(req, res){
            var result = {
                user: req.session.user
            };
            res.render('forum/chat');
        }
    };
    return chatController;
}