import angular from 'angular';

function mController(fetcher){
	'ngInject';
	var model = this;

	model.posts = [];
	model.loading = false;
	model.limit = 1;
	model.active = 1;
	model.total = 1;

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

	model.deletePost = function(e,id){
		e.preventDefault();
		var conf = confirm('Do you want to detele this article?');
		if(conf){
			fetcher.delPost(id).then(function(){
				var ind = -1;
				model.posts.forEach(function(itm, index){
					if(itm.permalink == id){
						ind = index;
					}
				});
				if(ind !== -1){
					model.posts.splice(ind,1);
				}
			});
		}
	}
}

export default {
	template: require('./postlist.html'),
	controller: mController,
	controllerAs: 'model'
}

