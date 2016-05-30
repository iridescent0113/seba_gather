var jwtSimple = require('jwt-simple');
var config = require('../config/config');
var User = require('./userSchema');

var userController = {};
userController.login = function(req, res, next) {
	console.log('userController login');
	if(!req.body.username) {
		res.status(400).send('username required');
		return;
	}
	if(!req.body.password) {
		res.status(400).send('password required');
		return;
	}
	User.findOne({ username : req.body.username }, function(err, user) {
		if(err) {
			res.status(500).send(err);
			return;
		}
		if(!user) {
			res.status(401).send('Invalid Credentials');
			return;
		}
		user.comparePassword(req.body.password, function(err, isMatch) {
			if(!isMatch || err) {
				res.status(401).send('Invalid Credentials');
			}
			else {
				res.status(200).json({ token : createToken(user)});
			}
		});
	});
}

userController.register = function(req, res) {
	if(!req.body.username) {
		res.status(400).send('username required');
		return;
	}
	if(!req.body.password) {
		res.status(400).send('password required');
		return;
	}
	var user = new User();

	user.username = req.body.username;
	user.password = req.body.password;

	user.save(function(err) {
		if(err) {
			res.status(500).send(err);
			return;
		}
		res.status(201).json({ token : createToken(user) });
	});
};

userController.unregister = function(req, res) {
	req.user.remove().then(function(user) {
		res.sendStatus(200);
	}, function(err) {
		res.status(500).send(err);
	});
};

function createToken(user) {
	var tokenPayload = {
		user : {
			_id : user._id,
			username : user.username
		}
	};
	return jwtSimple.encode(tokenPayload, config.jwtSecret);
}

module.exports = userController;
