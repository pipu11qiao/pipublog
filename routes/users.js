var express = require('express');
var models = require('../models');
var router = express.Router();
var util = require('../util');
var md5 = util.md5;
var auth = require('../middleware/auth');

/* GET users listing. */
// static
router.get(/login|reg/,auth.checkNotLogin);
router.get('/login',auth.checkNotLogin,function(req, res, next) {
	res.render('user/login.html', { title: '登录' });
});
router.get('/reg', function(req, res, next) {
	res.render('user/reg.html', { title: '注册' });
});
router.get('/logout',function(req, res, next) {
	req.session.user = null;
	res.redirect('/');
});
// server port
router.post('/reg',function (req,res,next) {
  var curUser = req.body;
  if(curUser.repassword !== curUser.password) {
	  req.flash('failure','请输入相同的密码');
		res.redirect('back');
  } else {
	  curUser.password = md5(curUser.password);
	  models.User.findOne({username: curUser.username},function (err,user) {
		  if(user) {
			  req.flash('failure','该用户已存在');
			  res.redirect('back');
		  }else {
		  	curUser.avatar = getAvatar(curUser.email);
			  models.User.create(curUser,function (err,user) {
				  req.flash('success','注册成功');
				  req.session.user = user;
				  res.redirect('/');
			  })
		  }
	  });

  }
});
router.post('/login',function (req,res,next) {
	var user = req.body;
	user.password = md5(user.password);
	models.User.findOne(user,function (err,user) {
		if(err) {
			req.flash('failure','该用户不存在');
			res.redirect('back');
		} else {
			if(user) {
				// 找到用户
				req.session.user = user;
				req.flash('success','登录成功');
				res.redirect('/')
			} else {
				req.flash('failure','该用户不存在');
				// 登录失败
				res.redirect('back')
			}
		}
	})
});
function getAvatar(email) {
	return 'https://www.gravatar.com/avatar/' + md5(email.trim().toLowerCase()) + '?s=200';
}
module.exports = router;
