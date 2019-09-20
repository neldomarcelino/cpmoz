/// catch 404 and forwarding to error handler
exports.notFound =  function(req, res, next) {
    //var err = new Error('Not Found');
    //err.status = 404;
    var session = false;
    if(req.session.user!=undefined){
        session = true; 
    }
    res.status(404);
    res.render('not-found', {session});
};

// production error handler
// no stacktraces leaked to user
exports.serverError =  function(err, req, res, next) {
    res.status(500);
    var session = false;
    if(req.session.user!=undefined){
        session = true; 
    }
    res.render('server-error', {
        message: err.message,
        error: {},
        session
    });
};