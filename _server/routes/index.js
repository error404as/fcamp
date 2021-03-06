var express = require('express');
var router = express.Router();
var ctrl = require('../controllers');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var passport = require('passport');  


var formi = require('formidable');


router.get('/', function(req, res, next) {
	ctrl.get(function(data){
		res.render('index', { title: 'Blog Home', posts: data, moment: moment, editor: res.isuser });
	})
});

router.get('/add', isLoggedIn, function(req, res, next) {
	res.render('add', { title: 'Add new post', editor: res.isuser });
});

router.post('/add', isLoggedIn, function(req, res, next) {

	var infile = new formi.IncomingForm();
	infile.uploadDir = path.resolve(__dirname, '../', 'public/uploads');
	infile.keepExtensions = true;
	infile.parse(req, function(err, fields, files){
		fields.image = '';
		if(files.image.size){
			console.log(files.image.path)
			var imgpath = files.image.path.replace(/\\/g,'/');
			fields.image = files.image.path.substring(imgpath.indexOf('public/uploads')+6);
			console.log(fields.image)
		}
		fields.author = req.user.local.username;
		ctrl.create(fields, function(db){
			if(db.result){
				res.redirect('/article/'+fields.permalink);
			} else {
				res.redirect('/add');
			}
		});
	});
    
});

router.get('/tags', function(req, res, next) {
	ctrl.getTags(function(data){
		res.json(data);
	});
});

router.get('/tag/:id', function(req, res, next) {
	ctrl.getPostsByTags(req.params.id, function(data){
		res.render('index', { title: req.params.id, posts: data, moment: moment, editor: res.isuser });
	});
});


router.get('/login', isLoggedOut, function(req, res, next) {  
  res.render('login.ejs', { title: 'Login', message: req.flash('loginMessage'), editor: res.isuser });
});

router.get('/signup', isLoggedOut, function(req, res) {  
  res.render('signup.ejs', { title: 'Sign Up', message: req.flash('loginMessage'), editor: res.isuser });
});

router.get('/logout', function(req, res) {  
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {  
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {  
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

module.exports = router;

function isLoggedIn(req, res, next) {  
	if(req.isAuthenticated()) { return next() };
	res.redirect('/login');
}
function isLoggedOut(req, res, next) {  
	if(req.isAuthenticated()) { res.redirect('/'); };
	next();
}
