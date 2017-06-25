//-->> Created by pipu on 2017/6/21.
var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.dbUrl);
exports.User = mongoose.model('user',new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	avatar: String
}));
exports.Article = mongoose.model('article',new mongoose.Schema({
	title: String,
	content: String,
	user: {type: mongoose.Schema.Types.ObjectId,ref:'user'}, // 关联user
	createTime: {
		type: Date,
		default: Date.now
	},
	updateTime: {
		type: Date,
		default: Date.now
	}
},{
	versionKey: false,
	timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
}));