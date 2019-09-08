module.exports = function(app){
	var userController = {
		login: function(req, res){
			res.render('user/login');
		},
		travel: function(req, res){
			var user = req.body.nome;
			console.log(user);
			
			if(user){
				var users = req.body;
				users['tickets'] = [];
				req.session.user = users;
				res.redirect('/forum'); 
			}else{
				res.redirect('/');
			}
		}
		,
		logout: function(req, res){
			req.session.destroy();
			res.redirect('/');
		}
	
	};
	return userController;
}
