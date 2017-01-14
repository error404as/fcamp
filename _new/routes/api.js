var express = require('express');
var router = express.Router();
var ctrl = require('../controllers');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var passport = require('passport');  



router.get('/posts', function(req, res, next) {
	ctrl.get(function(data){
		res.json(data);
	})
});

router.get('/post/:id', function(req, res, next) {

	ctrl.getPost(req.params.id, function(data){
		res.json(data);
	});

});

router.get('/post/tags', function(req, res, next) {
	ctrl.getTags(function(data){
		res.json(data);
	});
});

router.get('/post/tag/:id', function(req, res, next) {
	ctrl.getPostsByTags(req.params.id, function(data){
		res.json(data);
	});
});



module.exports = router;