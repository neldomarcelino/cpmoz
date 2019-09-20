module.exports = function(){
    var chatController = {
        index: function(req, res){
            var session = false;
            if(req.session.user!=undefined){
                session = true; 
            }
            var result = {data: req.session.user.name, session: session}
            res.render('forum/chat', result);
        }
    };
    return chatController;
}