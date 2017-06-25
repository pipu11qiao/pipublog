var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var articleModel = require('../models').Article;
var markdown = require('markdown').markdown;
/* GET users listing. */
router.get('/post',auth.checkLogin, function(req, res, next) {
  res.render('article/post.html');
});
router.post('/post', function(req, res, next) {
  var article = req.body;
  article.user = req.session.user._id;
  article.content = markdown.toHTML(article.content);
  articleModel.create(article,function (err,article) {
    if(err) {
      res.redirect('back');
    } else {
      console.log(article);
      req.flash('success','发表成功');
      res.redirect('/');
    }
  });
});

module.exports = router;
