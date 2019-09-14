const KEY = "cpmoz.forum";
const SECRET = "cpmoz";
const days = 360000 * 24 * 7;
//const dbUrlLocal = "mongodb://localhost/cpmoz"
var dbUrlOnline = "mongodb://heroku_7tzkz3jm:ds159641@ds159641.mlab.com:59641/heroku_7tzkz3jm"

var express = require('express');
var app = express();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var load = require('express-load');
var session = require('express-session');
var error = require('./middleware/error');

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var mongoose = require('mongoose');
var connection = mongoose.connection;

var cookie = cookieParser(SECRET);
var store = new session.MemoryStore();
var sessionOptions = {
    secure: false, secret: SECRET, key: KEY, 
    store: store, resave: false, saveUninitialized: true,
    cookie:{ maxAge: days}
};
var sessions = session(sessionOptions);


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,  useUnifiedTopology: true});
connection.once('open', function(){
    //console.log("Connect with database");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('database', mongoose);


app.use(favicon());
app.use(logger('dev'));
app.use(cookie);
app.use(sessions);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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
                //console.log(data.session.user.nome);
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



server.listen(process.env.PORT || 3000, function(){
	//console.log("comunidade de programadores de Mocambique");
});
