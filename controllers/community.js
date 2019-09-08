
module.exports = function(app) {
	
	var communityController = {
		index: function(req, res, next) {
			
			var user = req.session.user;
			var users = user.tickets;	
			var params = {user: user, users: users};		
			res.render('community/index', params);
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
