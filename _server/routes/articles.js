var express = require('express');
var router = express.Router();
var ctrl = require('../controllers');
var path = require('path');
var fs = require('fs');
var moment = require('moment');



router.get('/:id', function(req, res, next) {

	ctrl.getPost(req.params.id, function(data){
		console.log(data);
		res.render('post', { title: data.headline, post: data, moment: moment });
	});

});



module.exports = router;
