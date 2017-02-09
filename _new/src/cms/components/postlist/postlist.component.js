import angular from 'angular';

function mController(fetcher){
	'ngInject';
	var model = this;

	model.posts = [];
	model.loading = false;
	model.limit = 1;
	model.active = 1;
	model.total = 1;

	model.confirmArgs = null;
	model.confirmText = '';

	model.$onInit = function(){
		model.setPage(1);
	}

	model.setPage = function(n){
		model.loading = true;
		fetcher.getPosts(n).then(function(data){
			console.log(data.items)
			model.posts = data.items;
			model.loading = false;
			model.limit = data.perpage;
			model.active = data.page;
			model.total = data.total;
		});
	}

	model.deletePost = function(e, id, imsure){
		e.preventDefault();
		if(imsure){
			model.confirmArgs = null;
			model.loading = true; // not really, but :)
			fetcher.delPost(id).then(function(){
				model.setPage(model.active);
			});
		} else {
			var post = model.posts.filter(itm=>itm.permalink === id)[0];
			model.confirmText = `Do you want to delete the article? <h4>"${post.headline}"</h4><img src="${post.image}">`;
			model.confirmArgs = [id];
		}
	}
}

export default {
	template: require('./postlist.html'),
	controller: mController,
	controllerAs: 'model'
}

