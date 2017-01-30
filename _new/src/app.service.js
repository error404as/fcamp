import angular from 'angular';

export default angular.module('services', [])
    .service('fetcher', fetcher)
    .name;

function fetcher($http){
    return {
        getPosts: getPosts,
        getPost: getPost
    };

	function getPosts(page){
		return $http.get('/api/posts/'+page).then(resp => resp.data);
	}
	function getPost(id){
		return $http.get('/api/post/'+id).then(resp => resp.data);
	}
}