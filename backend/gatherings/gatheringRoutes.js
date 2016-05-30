var express = require('express');
var gatheringController = require('./gatheringController');
var passport = require('passport');

var gatheringRouter = express.Router();
gatheringRouter.post('/create', gatheringController.create);
gatheringRouter.get('/', gatheringController.getAll);

module.exports = gatheringRouter;
