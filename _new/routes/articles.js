var express = require('express');
var router = express.Router();
var ctrl = require('../controllers');
var path = require('path');
var fs = require('fs');
var moment = require('moment');



router.get('/:id', function(req, res, next) {

	ctrl.getPost(req.params.id, function(data){
		if(req.query.action === 'delete' && res.isuser === 'admin'){
			ctrl.deletePost(req.params.id, function(data){
				res.redirect('/');
			});
		} else {
			res.render('post', { title: data.headline, post: data, moment: moment, editor: res.isuser });
		}
	});

});



module.exports = router;
