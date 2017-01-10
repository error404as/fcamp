var db = require('../db');

module.exports = {
	create: function(data,fn){
		data.tags = data.tags ? data.tags.split(',').map(function(itm){ return itm.trim() }).filter(function(itm){ return itm }) : [];

		db.addPost(data,fn);
	},
	get: function(fn){
		db.getAll(fn);
	},
	getPost: function(id,fn){
		db.getByPermalink(id,fn);
	},
	deletePost: function(id,fn){
		db.deleteByPermalink(id,fn);
	},
	getTags: function(fn){
		db.getTags(fn);
	},
	getPostsByTags: function(id,fn){
		db.getByTag(id,fn);
	}
}

