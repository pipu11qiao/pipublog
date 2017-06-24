var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

/* GET users listing. */
router.get('/post',auth.checkLogin, function(req, res, next) {
  res.render('article/post.html');
});

module.exports = router;
