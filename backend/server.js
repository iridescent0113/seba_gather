var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var config = require('./config/config');

var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var mongoose = require('mongoose');
var User = require('./users/userSchema');

var userRoutes = require('./users/userRoutes');

mongoose.connect([config.db.host, '/', config.db.name].join(''), {
	
});

app.use(bodyParser.json());
app.use(passport.initialize());

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.jwtSecret;

passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
	console.log(jwtPayload);
	User.findOne( { _id : jwtPayload.user._id }, function(err, user) {
		if(err) {
			console.log(err);
			return done(err, false);
		}
		if(user)
			done(null, user);
		else 
			done(null, false);
		
	});
}));

app.use('/', userRoutes);
app.use('/views/gatherings', passport.authenticate('jwt', { session : false }));
app.use(express.static('../frontend'));

var port = 8080;
app.listen(port, function() {
	console.log('Server listening to port ' + port + '....');
});
