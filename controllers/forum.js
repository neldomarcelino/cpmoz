module.exports = function(app){
    var forum = app.models.forum;

    var forumController = {
        index: function(req, res){
            
            var query = {};

            forum.find(query)
                .sort({'data':-1})
                .exec(function(err, foruns){
                    if(err){
                        console.log("error occur");
                        res.redirect('/');
                    }else{
                        var session = false;
                        if(req.session.user!=undefined){
                            session = true; 
                        }
                        var newForuns = [];
                        var olderForuns = []
                        for(i = 0; i < foruns.length; i++){
                            if(i<10){
                                newForuns[i] = foruns[i];
                            }else{
                                olderForuns[i] = foruns[i]; 
                            }
                             
                        }
                        var result = {newForuns: newForuns, olderForuns: olderForuns, session:session};
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
            var userId = req.session.user.id;
            var query ={
                _id: _id
            };
            forum.findOne(query, function(err, result){
                if(err){
                    console.log("Error Occur");
                }else{
                    var session = false;
                    if(req.session.user!=undefined){
                        session = true; 
                    }
                    var data = {forun: result, id: _id, userId: userId, session: session};
                    
                    
                    forum.updateOne(query, 
                        { $inc: 
                            {
                                visualization: 1
                            } 
                        },{multi: false} ,function(err, numAffected){
                            var session = false;
                            
                            res.render('forum/chat', data);
                        }
                    );
                    
                }
            });
        }/*,
        searchForum: function(req, res){
            var title = req.body.search;

            var query = {
                title: title
            }
            forun.find(query, function(){

            })
        }*/

    };
    return forumController;
}