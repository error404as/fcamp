import angular from 'angular';
import ngRouter from 'angular-route';

export default angular.module('services', [ngRouter])
    .service('fetcher', fetcher)
    .service('router', router)
    .name;

function fetcher($http){
	'ngInject';
    return {
        getPosts: getPosts,
        getPost: getPost,
        updPost: updatePost,
        delPost: deletePost
    };

	function getPosts(page){
		return $http.get('/api/posts/'+page).then(resp => resp.data);
	}
	function getPost(id){
		return $http.get('/api/post/'+id).then(resp => resp.data);
	}
	function updatePost(post){
		return $http.post('/edit/', post).then(resp => resp.data);
	}
	function deletePost(id){
		return $http.get('/article/'+id+'?action=delete');
	}
}

function router($routeParams){
	'ngInject';
	return {
		getId: getId
	}
	function getId(){
		return $routeParams.id
	}
}