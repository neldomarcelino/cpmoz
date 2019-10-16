module.exports = function(app){
	var homeController = {
		index: function(req, res){
			var session = false;
			if(req.session.user!=undefined){
				session = true; 
				res.render('home/index', {session: session});
			}else{
				res.render('home/index', {session});
			}
			
		},
		about: function(req, res){
			var session = false;
			if(req.session.user!=undefined){
				session = true; 
				res.render('about', {session: session});
			}else{
				res.render('about', {session});
			}
		}
	};
	return homeController;
};
