module.exports = function(app){
	var homeController = {
		index: function(req, res){
			res.render('home/index');
		},
		login: function(req, res){
			var ticket = req.body.ticket;
			
			if(ticket){
				//var user['tickets'] = [];
				//req.session.ticket = user;
				res.redirect('/comunidade'); 
			}else{
				res.redirect('/');
			}
			res.render('user/login');
		},
		logout: function(req, res){
			req.session.destroy();
			res.redirect('/');
		}
	};
	return homeController;
};
