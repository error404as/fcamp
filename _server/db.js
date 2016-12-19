var mongoose = require('mongoose');
var path = require('path');
var postSchema = require('./models/BlogPost');

var nconf = require('nconf').file({ file: path.join(__dirname, 'config.json') });

mongoose.connect(nconf.get('db_url'));


var BlogPost = mongoose.model('BlogPost', postSchema);



module.exports = {
	addPost: function(data,fn){
		//console.log(data)
		new BlogPost(data).save(function (err) {
			if(err){
				console.log('error on saving: '+data.permalink);
			} else {
				console.log('saved: '+data.permalink);
			}
			if(typeof fn === 'function'){
				fn({result: !err});
			}
		});	
	},
	getAll: function(fn){
		BlogPost.find().sort({created: -1}).exec(function(err, data){
			fn(data)
		});

	},
	getByPermalink: function(id,fn){
		BlogPost.findOne({permalink: id}).exec(function(err, data){
			fn(data)
		});

	},
	deleteByPermalink: function(id,fn){
		BlogPost.remove({permalink: id}).exec(function(err){
			fn();
		});
	},
	getByTag: function(id,fn){
		BlogPost.find({tags: id}).sort({created: -1}).exec(function(err, data){
			fn(data)
		});

	},
	getTags: function(fn){
		BlogPost.aggregate([
			{$unwind: '$tags'},
			{$group: {_id:'$tags', sum: {$sum:1} }}
		]).exec(function(err, tags){  fn(tags) });

	}
};

