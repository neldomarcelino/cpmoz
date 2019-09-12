module.exports = function(app){
	var user = app.models.user;
	var userController = {
		login: function(req, res){
			res.render('user/login');
		},
		autentice: function(req, res, next){
			var email = req.body.email;
			var password = req.body.password;
			var query = {email: email};
			
			user.findOne(query)
				.select('name email password')
				.exec(function(err, user){
					if(err){
						console.log("Error occur at login!");
					}
					if(user && user.password == password){
						req.session.user = user;
						res.redirect('/foruns');
					}else{
						console.log('user not exists');
						res.redirect('/login');
					}
				});
		},
		getRegistry: function(req, res){
			res.render('user/registry');
		},
		registry: function(req, res){

			var email = req.body.email;
			var name = req.body.name;
			var contact = req.body.contact;
			var password = req.body.password;

			var query = {
				email: email,
				name: name,
				contact: contact,
				password: password
			}
			var newUser = new user(query);

			newUser.save(function(err){
				if(err){
					console.log("registry user error" + err.toString());
				}else{
					res.redirect('/login');
				}
			});
		},
		logout: function(req, res){
			req.session.destroy();
			res.redirect('/');
		}
	
	};
	return userController;
}
