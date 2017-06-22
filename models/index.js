//-->> Created by pipu on 2017/6/21.
var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.dbUrl);
exports.User = mongoose.model('user',new mongoose.Schema({
	username: String,
	password: String,
	email: String
}));