var db = require('../db');
var pageLimit = 5;

module.exports = {
	create: function(data,fn){
		data.tags = data.tags ? data.tags.split(',').map(function(itm){ return itm.trim() }).filter(function(itm){ return itm }) : [];
		if(!data.permalink){
			data.permalink = new Date().getTime();
		}
		if(!data.created){
			data.created = new Date().toISOString()
		}
		db.addPost(data,fn);
	},
	update: function(data,fn){
		var post = {
			headline: data.headline,
			body: data.body,
			permalink: data.permalink || new Date().getTime(),
			image: data.image || '',
			author: data.author,
			tags: data.tags,
			created: data.created || new Date().toISOString()
		}
		if( typeof data.tags !== 'object' ){
			post.tags = data.tags ? data.tags.split(',').map(function(itm){ return itm.trim() }).filter(function(itm){ return itm }) : [];
		}

		db.updatePost(post,fn);
	},
	get: function(fn){
		db.getAll(fn);
	},
	getLimited: function(page,fn){
		var skip = (page - 1) * pageLimit;
		db.getSome(pageLimit, skip, fn);
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
	},
	checkBySource: function(urls, fn){
		db.getBySource(urls,fn);
	}
}

