import angular from 'angular';

function mController(fetcher){
	var model = this;

	model.posts = [];
	model.pager = [];
	model.loading = false;

	model.$onInit = function(){
		model.setPage(1);
	}

	model.setPage = function(n){
		model.loading = true;
		fetcher.getPosts(n).then(function(data){
			model.posts = data.items;
			model.loading = false;
			model.pager = pageBuilder(data.page, Math.ceil(data.total / data.perpage));
		});
	}
}

function pageBuilder(active, total){
	var result = [];
	for(var i = 1; i <= total; i++){
		result.push({
			page: i,
			isActive: (i===active)
		})
	}
	return result;
}

export default {
	template: require('./postlist.html'),
	controller: ['fetcher', mController],
	controllerAs: 'model'
}

