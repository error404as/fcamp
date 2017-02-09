import angular from 'angular';

function mController(){
	var model = this;

	model.visible = false;

	model.$onChanges = function(){
		model.visible = true;
	}

	model.confirmAction = function(e){
		e.preventDefault();
		model.action(e, ...model.actionargs, true)
	}

	model.cancelAction = function(e){
		e.preventDefault();
		model.visible = false;
	}
}

export default {
	template: require('./confirm.html'),
	controller: mController,
	controllerAs: 'model',
	bindings: {
		action: '<',
		actionargs: '<',
		text: '<'
	}
}

