/// catch 404 and forwarding to error handler
exports.notFound =  function(req, res, next) {
    //var err = new Error('Not Found');
    //err.status = 404;
    res.status(404);
    res.render('not-found');
};

// production error handler
// no stacktraces leaked to user
exports.serverError =  function(err, req, res, next) {
    res.status(500);
    res.render('server-error', {
        message: err.message,
        error: {}
    });
};