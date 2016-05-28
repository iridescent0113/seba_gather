var express = require('express');
var userController = require('./userController');

var userRouter = express.Router();
userRouter.post('/login', userController.login);

module.exports = userRouter;
