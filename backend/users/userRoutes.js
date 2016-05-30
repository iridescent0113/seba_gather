var express = require('express');
var userController = require('./userController');
var passport = require('passport');

var userRouter = express.Router();
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.post('/unregister', passport.authenticate('jwt', { session : false }), userController.unregister);

module.exports = userRouter;
