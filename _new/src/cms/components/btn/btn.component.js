import angular from 'angular';

function mController(){
	var model = this;
}

export default {
	template: require('./btn.html'),
	controller: mController,
	controllerAs: 'model',
	bindings: {
		url: '@',
		text: '@'
	}
}

