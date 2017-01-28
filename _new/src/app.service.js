import angular from 'angular';

export default angular.module('services', [])
    .service('fetcher', fetcher)
    .name;

function fetcher($http){
    return {
        getPosts: getPosts
    };

	function getPosts(){
		return $http.get('/api/posts').then(resp => resp.data);
	}
}