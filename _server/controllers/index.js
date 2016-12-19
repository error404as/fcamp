var db = require('../db');

module.exports = {
	create: function(data){
		console.log(data)
		data.author = 'admin';
		data.tags = data.tags ? data.tags.split(',').map(function(itm){ return itm.trim() }).filter(function(itm){ return itm }) : [];

		db.addPost(data);
	},
	get: function(fn){
		db.getAll(fn);
	},
	getPost: function(id,fn){
		db.getByPermalink(id,fn);
	},
	getTags: function(fn){
		db.getTags(fn);
	},
	getPostsByTags: function(id,fn){
		db.getByTag(id,fn);
	}
}

