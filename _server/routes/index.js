var express = require('express');
var router = express.Router();
var ctrl = require('../controllers');
var path = require('path');
var fs = require('fs');
var moment = require('moment');

var formi = require('formidable');


router.get('/', function(req, res, next) {
	ctrl.get(function(data){
		res.render('index', { title: 'Blog Home', posts: data, moment: moment });
	})
});

router.get('/add', function(req, res, next) {
	res.render('add', { title: 'Add new post' });
});

router.post('/add', function(req, res, next) {

	var infile = new formi.IncomingForm();
	infile.uploadDir = "./public/uploads";
	infile.keepExtensions = true;
	infile.parse(req, function(err, fields, files){
		fields.image = files.image.size ? files.image.path.replace(/^public\\/,'').replace(/^public\//,'') : '';
		//console.log(fields); return
		ctrl.create(fields);
		res.redirect('/add');
	});
    
});

router.get('/tags', function(req, res, next) {
	ctrl.getTags(function(data){
		res.json(data);
	});
});

router.get('/tag/:id', function(req, res, next) {
	ctrl.getPostsByTags(req.params.id, function(data){
		res.render('index', { title: req.params.id, posts: data, moment: moment });
	});
});

module.exports = router;
