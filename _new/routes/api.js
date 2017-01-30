var express = require('express');
var router = express.Router();
var ctrl = require('../controllers');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var passport = require('passport');  

var pageLimit = 10;


router.get('/posts', function(req, res, next) {
	ctrl.get(function(data){
		res.json(data);
	})
});

router.get('/posts/:page', function(req, res, next) {
	var page = Number(req.params.page) || 1;
	ctrl.get(function(data){
		var skip = (page - 1) * pageLimit;
		var items = data.slice(skip, skip+pageLimit);
		res.json({
			total: data.length,
			page: page,
			perpage: pageLimit,
			items: items
		});
	});
	/*
	ctrl.getLimited(req.params.page, function(data){
		res.json(data);
	})
	*/
});

router.get('/post/:id', function(req, res, next) {

	ctrl.getPost(req.params.id, function(data){
		res.json(data);
	});

});

router.get('/tags', function(req, res, next) {
	ctrl.getTags(function(data){
		res.json(data);
	});
});

router.get('/tag/:id', function(req, res, next) {
	ctrl.getPostsByTags(req.params.id, function(data){
		res.json(data);
	});
});



module.exports = router;