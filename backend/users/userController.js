var jwtSimple = require('jwt-simple');
var config = require('../config/config');

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
	res.status(200).json( { token : createToken( { _id : 1, username : 'Stephan' } ) } );
//	User.findOne({ username : req.body.username }, function(err, user) {
//		if(err) {
//			res.status(500).send(err);
//			return;
//		}
//		if(!user) {
//			res.status(401).send('Invalid Credentials');
//			return;
//		}
//		user.comparePassword(req.body.password, function(err, isMatch) {
//			if(!isMatch || err) {
//				res.status(401).send('Invalid Credentials');
//			}
//			else {
//				res.status(200).json({ token : createToken(user)});
//			}
//		});
//	});
}

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
