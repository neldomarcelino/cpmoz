module.exports = function(app){
    var forum = app.models.forum;

    var forumController = {
        index: function(req, res){
            
            var query = {}
            forum.find(query, function(err, foruns){
                if(err){
                    console.log("error occur");
                    res.redirect('/');
                }else{
                    var session = false;
                    if(req.session.user!=undefined){
                        session = true; 
                    }
                    var result = {foruns: foruns, session:session};
                    res.render('forum/index', result);
                }    
            });
            
        },
        create: function(req, res){
            var title = req.body.title;
            var introdution = req.body.introdution;
            var autor = req.session.user.name;
            var query = {
                title: title,
                introdution: introdution,
                autor: autor
            }
            var newForum = new forum(query);
            newForum.save(function(err){
                if(err){
                    console.log("Error occur");
                }else{
                    res.redirect('/foruns');
                }
            });
        },
        openForum: function(req, res){
            var _id = req.params.id;

            var query ={
                _id: _id
            };
            forum.findOne(query, function(err, result){
                if(err){
                    console.log("Error Occur");
                }else{
                    var data = {forun: result, id: _id};
                    res.render('forum/chat', data);
                }
            });
        }

    };
    return forumController;
}