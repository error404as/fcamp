var express = require('express');
var router = express.Router();
var ctrl = require('../controllers');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var passport = require('passport');  
var formidable = require('formidable');  


var formi = require('formidable');


router.get('/', function(req, res, next) {
	res.render('index', { title: 'Blog Home', editor: res.isuser });
});

router.get('/article/:id', function(req, res, next) {
	if(req.query.action === 'delete' && res.isuser === 'admin'){
		ctrl.deletePost(req.params.id, function(data){
			res.redirect('/');
		});
	} else {
		res.render('index', { title: 'Blog', editor: res.isuser });
	}
});

router.get('/tag/:id', function(req, res, next) {
	res.render('index', { title: req.params.id, editor: res.isuser });
});

router.get('/cms', isLoggedIn, function(req, res, next) {
	res.render('cms', { title: 'CMS', editor: res.isuser });
});

router.get('/add', isLoggedIn, function(req, res, next) {
	res.render('add', { title: 'Add new post', editor: res.isuser });
});

router.post('/add', isLoggedIn, function(req, res, next) {
	var fields = req.body;

	fields.author = req.user.local.username;

	ctrl.create(fields, function(db){
		if(db.result){
			res.redirect('/article/'+fields.permalink);
		} else {
			res.redirect('/cms/#/add');
		}
	});

});

router.post('/edit', isLoggedIn, function(req, res, next) {

	req.body.author = req.body.author || req.user.local.username;
	ctrl.update(req.body, function(db){
		if(db.result){
			res.send('OK');
		} else {
			res.send('ERROR');
		}
	});

});

router.post('/add-news', isLoggedIn, function(req, res, next) {
	ctrl.create(req.body, function(db){
		if(db.result){
			res.send('OK');
		} else {
			res.send('Error');
		}
	});   
});

router.post('/check-exists', function(req, res, next) {
	ctrl.checkBySource(req.body, function(db){
		res.send(db);
	});   
});

router.post('/upload', isLoggedIn, function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../public/uploads');
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        res.send(path.basename(files.image.path));
    });

});

router.get('/login', isLoggedOut, function(req, res, next) {  
  res.render('login.ejs', { title: 'Login', message: req.flash('loginMessage'), editor: res.isuser });
});

/*
router.get('/signup', isLoggedOut, function(req, res) {  
  res.render('signup.ejs', { title: 'Sign Up', message: req.flash('loginMessage'), editor: res.isuser });
});

router.post('/signup', passport.authenticate('local-signup', {  
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true,
}));
*/

router.get('/logout', function(req, res) {  
  req.logout();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local-login', {  
  successRedirect: '/cms',
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
