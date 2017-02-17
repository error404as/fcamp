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
        delPost: deletePost,
        getNews: getNews,
        addNewsItem: addNewsItem,
        checkExists: checkExists,
        uploadImage: uploadImage
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
	function getNews(source){
		return $http.get('https://newsapi.org/v1/articles?source='+source+'&apiKey=d3a3b4d86b5d48dd98a34ed0bcebfa07').then(resp => resp.data);
	}
	function addNewsItem(post){
		return $http.post('/add-news', post).then(resp => resp.data);
	}
	function checkExists(urls){
		return $http.post('/check-exists', urls).then(resp => resp.data);
	}
	function uploadImage(file){
		return $http.post('/upload', file, { headers: {'Content-Type': undefined} }).then(resp => resp.data);
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