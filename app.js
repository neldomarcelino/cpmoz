var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var load = require('express-load');
var session = require('express-session');
var error = require('./middleware/error');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var KEY = "cpmoz.forum";
var SECRET = "cpmoz";
var cookie = cookieParser(SECRET);
var store = new session.MemoryStore();
var sessionOptions = {
    secure: false, secret: SECRET, key: KEY, 
    store: store, resave: false, saveUninitialized: true
};
session = session(sessionOptions);
	
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(cookie);
app.use(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

io.set('authorization', function(data, accept) {
    cookie(data, {}, function(err) {
        var sessionID = data.signedCookies[KEY];
        store.get(sessionID, function(err, session) {
            if (err || !session) {
                accept('session no found', false);
            } else {
                data.session = session;
                accept(null, true);
                console.log(data.session.user.nome);
            }
        });
    });
});




// Configure Load Express
load('models').
	then('controllers')
	.then('routes')
    .into(app);

load('sockets')
    .into(io);

app.use(error.notFound);
app.use(error.serverError);   




/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}



server.listen(3000, function(){
	console.log("comunidade de programadores de Mocambique");
});
