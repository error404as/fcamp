import angular from 'angular';

function mController(fetcher){
	'ngInject';
	var model = this;

	model.posts = [];
	model.loading = false;
	model.current = '';
	model.sources = [
		"bbc-news",
		"bloomberg",
		"cnn",
		"google-news",
		"hacker-news",
		"mtv-news",
		"national-geographic",
		"polygon",
		"reddit-r-all",
		"reuters",
		"techradar",
		"the-guardian-uk",
		"the-new-york-times",
		"the-telegraph",
		"the-washington-post",
		"time",
		"usa-today"
	];

	model.$onInit = function(){
		window.document.body.classList.remove('has_data');
	};

	model.fetchFrom = function(e,source){
		e.preventDefault();
		window.document.body.classList.add('has_data');
		model.loading = true;
		model.current = source;
		fetcher.getNews(source).then(data => {
			model.loading = false;
			model.current = data.source;
			model.posts = data.articles;

			var urls = data.articles.map(itm => itm.url);
			fetcher.checkExists(urls).then(result => {
				if(result.length){
					var matches = result.map(itm => itm.source);
					model.posts.forEach(itm=>{
						if(matches.indexOf(itm.url) !== -1){
							itm.status = 'added';
						}
					});
				}
			});
		});
	};
	model.addItem = function(event, url){
		event.preventDefault();
		var item = model.posts.filter( itm => itm.url === url )[0];
		if(item && !item.status){
			item.status = 'adding';
			var sendingData = {
				author: item.author || model.current,
				permalink: new Date().getTime(),
				headline: item.title,
				body: item.description || ' ', // some articles has no description
				image: item.urlToImage,
				created: item.publishedAt,
				tags: this.currentSource,
				source: item.url
			};
			fetcher.addNewsItem(sendingData).then(function(data){
				item.status = data === 'OK' ? 'added': 'error';
			});
		}
	}

}

export default {
	template: require('./addnews.html'),
	controller: mController,
	controllerAs: 'model'
}

