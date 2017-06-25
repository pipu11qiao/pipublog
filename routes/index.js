var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Article.find().populate('user').exec(function (err,articles) {
	  res.render('index', { articles: articles });
  });


});

module.exports = router;
