var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var gatheringSchema = mongoose.Schema({
	name : {
		type: String,
		required: true,
		unique: true
	},
	sport_type : {
		type: String,
		required: true
	}
});

gatheringSchema.pre('save', function(next) { });



var Gathering = mongoose.model('Gathering', gatheringSchema);

module.exports = Gathering;
