
module.exports = function(app) {
	
	var communityController = {
		index: function(req, res, next) {
			var session = false;
            if(req.session.user!=undefined){
				session = true; 
				res.render('community/index', {session: session, user: req.session.user.name});
            }else{
				res.render('community/index', {session});
			}
			
		},
		create: function(req, res){
			var user = req.session.user;
		},
		show: function(req, res){
		
		},
		edit: function(req, res){
		
		},
		destroy: function(req, res){
			
		}
	};
	return communityController;

}
