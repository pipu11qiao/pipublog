var express = require('express');
var models = require('../models');
var router = express.Router();
var util = require('../util');
var md5 = util.md5;

/* GET users listing. */
// static
router.get('/login', function(req, res, next) {
	res.render('user/login.html', { title: '登录' });
});
router.get('/reg', function(req, res, next) {
	res.render('user/reg.html', { title: '注册' });
});
router.get('/logout', function(req, res, next) {
	res.render('index', { title: '退出' });
});
// server port
router.post('/reg',function (req,res,next) {
  var user = req.body;
  if(user.repassword !== user.password) {
		res.redirect('back');
  } else {
	  user.password = md5(user.password);
	  models.User.create(user,function (err,user) {
		  console.log(user);
		  res.redirect('/users/login');
	  })
  }
});
function encode() {
	var md5 = crypto.createHash('md5');
}
module.exports = router;
