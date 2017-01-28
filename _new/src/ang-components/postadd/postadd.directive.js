export const PostAddDirective =  function(){
	return {
		restrict: 'E',
		template: require('./postadd.html'),
		controller: ['$http', function($http){
			var model = this;

			model.headline = '';
			model.post = {};
			model.formCheck = function(e,f){
				e.preventDefault()
				console.log('----------')
				console.log(f)
				console.log(f.headline.$error)
				//return false
			}
			

		}],
		controllerAs: 'model'
	}
}
/*
*/