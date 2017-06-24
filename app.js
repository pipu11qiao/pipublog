var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');

// session relative
var session = require('express-session');// req.session 依赖cookie
var MongooseStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
  secret: 'pipublog',
  resave: true, // 每次响应结束后都保存下session数据
  saveUninitialized: true, //保存新创建单位初始化的session
  store: new MongooseStore({
    url: require('./config').dbUrl
  })
}));
app.use(flash());
// 处理用户session
app.use(function (req,res,next) {
  // res.locals 才是真正的渲染对象。
  res.locals.user = req.session.user;
  // 页面传递信息
  res.locals.success = req.flash('success')[0];
  res.locals.failure = req.flash('failure')[0];

  next();
});



app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
