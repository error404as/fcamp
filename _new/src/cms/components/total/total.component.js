import angular from 'angular';

function mController(){
	var model = this;

	model.$onInit = function(){
		model.actual = actual();
	}
	model.$onChanges = function(){
		model.actual = actual();
	}

	function actual(){
		var max = model.limit * model.active;
		return (max - model.limit + 1) + '-' + (max > model.total ? model.total : max);
	}

}

export default {
	template: require('./total.html'),
	controller: mController,
	controllerAs: 'model',
	bindings: {
		limit: '<',
		active: '<',
		total: '<'
	}
}

