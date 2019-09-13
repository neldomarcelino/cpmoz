module.exports = function(){
    var chatController = {
        index: function(req, res){
            res.render('forum/chat');
        }
    };
    return chatController;
}