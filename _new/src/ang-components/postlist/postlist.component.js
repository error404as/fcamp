import angular from 'angular';

function mController(fetcher){
	var model = this;

	model.posts = [];

	model.$onInit = function(){
		fetcher.getPosts().then(function(data){
			model.posts = data;
		});
	}
}

export default {
	template: require('./postlist.html'),
	controller: ['fetcher', mController],
	controllerAs: 'model'
}


/*
*/