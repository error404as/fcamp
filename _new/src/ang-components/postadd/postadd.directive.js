function formatURL(id){
	var result = window.location.host || '';
	if(result){
		result = window.location.protocol + '//' + result;
	}
	result += '/article/'+id;
	return result;
}
function setViewDate(d){
	var date = new Date(d);
	var offset = date.getTimezoneOffset() * 60 * 1000;
	var string = new Date( date-offset ).toISOString();
	var stringDate = string.substring(0, string.lastIndexOf(':')).replace('T', ' ');
	return stringDate;
}
function setDate(val){
	val = val.trim();
	if(val.indexOf(':') === -1){
		val += ' 00:00';
	}

	if(new Date('2016-12-15T17:08').toISOString().indexOf('2016-12-15T17:08') !== 0){
		// I know, this is IE ;)
		val = val.replace(' ','T');
	}

	return new Date(val).toISOString();
}

export const PostAddDirective =  function(){
	return {
		restrict: 'E',
		template: require('./postadd.html'),
		controller: ['$http', '$routeParams', 'fetcher', function($http, $routeParams, fetcher){
			var model = this;
			var date = new Date();

			model.editing = $routeParams.id || '';
			model.post = {
				headline: '',
				body: '',
				tags: '',
				permalink: '',
				created: date.toISOString(),
				image: ''
			};
			model.permalinkView = '';

			model.createdView = setViewDate(date);

			model.formatUrl = function(){
				model.permalinkView = formatURL(model.post.permalink);
			};
			model.formatDate = function(){
				model.created = setDate(model.createdView);
			};

			if($routeParams.id){

				fetcher.getPost($routeParams.id).then(function(data){
					console.log(data)

					model.post = data;
					model.formatUrl();
					model.createdView = setViewDate(model.post.created);
				});

			}

			model.formCheck = function(e,f){
				e.preventDefault()
				if(f.$valid){
					console.log(model.post)

					$http.post('/add/', model.post).then(function(){
						console.log('done')
					}, function(data,status){
						console.log('error')
						console.log(data)
						console.log(status)

					});

				} else {
					for(var er in f.$error){
						f.$error[er].forEach(itm=>itm.$setDirty())
					}
				}
			}
			

		}],
		controllerAs: 'model'
	}
}
/*
*/