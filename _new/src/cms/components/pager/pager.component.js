import angular from 'angular';

function mController(){
	var model = this;

	model.pager = [];
	model.active = 1;
	model.total = 1;
	model.limit = 1;

	model.$onInit = function(){
		model.pager = pageBuilder(model.active, Math.ceil(model.total / model.limit));
	}
	model.$onChanges = function(){
		model.pager = pageBuilder(model.active, Math.ceil(model.total / model.limit));
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
	template: require('./pager.html'),
	controller: mController,
	controllerAs: 'model',
	bindings: {
		limit: '<',
		active: '<',
		total: '<',
		action: '<'
	}
}

