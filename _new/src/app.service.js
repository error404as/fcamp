import angular from 'angular';

export default angular.module('services', [])
    .service('fetcher', fetcher)
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