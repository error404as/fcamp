const appConfig = require('./config');
var mongoose = require('mongoose');
mongoose.connect(appConfig.db_url);

var BlogPost = mongoose.model('BlogPost', {
	permalink: {type: String, required: true, index: true, unique: true, dropDups: true},
	headline:  {type: String, trim: true, required: true},
	body:      {type: String, required: true},
	author:    {type: String, required: true, index: true},
	tags:      [{type: String}],
	created:   {type: Date, default: Date.now, index: true},
	comments:  [{ author: String, email: String, body: String, date: {type: Date, default: Date.now} }],
});

function insertPost(){
	// random ids. post_1 - post_100
	let ind = Math.ceil(Math.random()*100)
	let data = {
		permalink: 'post_'+ind,
		headline: 'Hello post',
		author: 'admin',
		body: 'Paragraph of text'
	};
	new BlogPost(data).save(function (err) {
		if(err){
			console.log('error on saving: '+data.permalink);
			//console.log(err);
		} else {
			console.log('saved: '+data.permalink);
		}
	});	
}

/**
	will try to add 5 posts with randon permalinks as they should be unique
**/
for(var i = 0; i < 5; i++){
	insertPost();
}

