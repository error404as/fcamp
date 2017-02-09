export default function($routeProvider, $locationProvider){
	'ngInject';
	$routeProvider
		.when('/', {
			template: '<post-list></post-list>'
		})
		.when('/add', {
			template: '<post-add></post-add>'
		})
		.when('/add-news', {
			template: '<add-news-from-api></add-news-from-api>'
		})
		.when('/edit/:id', {
			template: '<post-add></post-add>'
		})
		.otherwise({redirectTo:'/'})

	$locationProvider.hashPrefix('');
}