//-->> Created by pipu on 2017/6/23.
// 必须登录之后才能访问
exports.checkLogin = function (req,res,next) {
	if(!req.session.user) {
		req.flash('failure','请先登录');
		res.redirect('/');
	} else {
		next();
	}
};
//必须登录之前才能访问
exports.checkNotLogin = function (req,res,next) {
	if(req.session.user) {
		req.flash('failure','您已登录');
		res.redirect('/');
	} else {
		next();
	}
};