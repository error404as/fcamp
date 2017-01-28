export default function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			template: '<post-list></post-list>'
		})
		.when('/add', {
			template: '<post-add></post-add>'
		})
		.otherwise({redirectTo:'/'})

	$locationProvider.hashPrefix('');
}