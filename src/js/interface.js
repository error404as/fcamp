import 'es6-promise/auto';
import 'whatwg-fetch';

class NewsViewer {
	constructor(){
		this.container = document.querySelector('.view');
		this.sources = [
			'bbc-news', 'bloomberg', 'cnn', 'google-news', 'hacker-news', 'mtv-news',
			'national-geographic', 'polygon', 'reddit-r-all', 'reuters', 'techradar', 'the-guardian-uk',
			'the-new-york-times', 'the-telegraph', 'the-washington-post', 'time', 'usa-today'
		];

		document.querySelector('.nav ul').innerHTML = this.sources.map((itm) => `
			<li><a href="#${itm}">
				<span class="img"><img src="http://i.newsapi.org/${itm}-m.png" alt="${itm}"></span>
				<span class="name">${itm.replace(/-/g,' ')}</span>
			</a></li>
			`).join('');
		this.updSourceName();
		window.addEventListener('hashchange', ()=>{
			this.update();
		}, true);

		if(this.getSource()){
			document.body.classList.add('has_data');
			this.update();
		}
	}
	render(data){
		this.cssLoad();
		this.container.innerHTML = data.map((itm) => `
			<div class="item">
				<a href="${itm.url}">
					<div class="vis"><div class="img"><img src="${itm.urlToImage || 'images/no_photo.png'}" /></div></div>
					<h2>${itm.title}</h2>
					<div class="pubdate">${this.dateToStr(itm.publishedAt)}</div>
					<p>${itm.description || ''}</p>
				</a>
			</div>`).join('');
	}
	updSourceName(text = 'Please select news source...'){
		document.querySelector('.header h1').setAttribute('data-source',text);
	}
	getSource() {
		if(window.location.hash){
			let hash = window.location.hash.substring(1);
			return this.sources.indexOf(hash) !== -1 ? hash : null;
		}
		return null;
	}
	markNav(id){
		let current = document.querySelector('.nav .active');
		let active = document.querySelector('.nav [href="#'+id+'"]');
		if(current){
			current.classList.remove('active');
		}
		if(active){
			active.parentNode.classList.add('active');
		}
	}
	update(source){
		source = source || this.getSource();
		if(!source){
			document.body.classList.remove('has_data');
			this.updSourceName();
			return;
		}
		this.markNav(source);
		this.updSourceName(source);
		this.container.innerHTML = 'Loading data... Please wait.';
		document.body.classList.add('has_data');
		let provider = new NewsProvider();
		provider.get(source, this.render.bind(this));
	}
	dateToStr(t) {
		if(!t){ return ''; }
		// YYYY-MM-DD:HH-MM
		function _zero(i){ return i > 9 ? i : '0'+i; }
			if(typeof t === 'string' || typeof t === 'number'){
			t = new Date(t);
		}
		var str = t.getFullYear();
		str += '-'+_zero(t.getMonth()+1);
		str += '-'+_zero(t.getDate());
		str += ' '+_zero(t.getHours());
		str += ':'+_zero(t.getMinutes());
		//str += '-'+_zero(t.getSeconds());
		return str;
	}
	cssLoad(){
		require.ensure([], function(){
			require('../css/view.less');
		},'view');
	}

}

class NewsProvider {
	constructor(){
		this.apikey = 'd3a3b4d86b5d48dd98a34ed0bcebfa07';
	}
	get(source, callback){
		fetch('https://newsapi.org/v1/articles?source='+source+'&apiKey='+this.apikey).then(function(response) {
			return response.json();
		}).then(function(response) {
			console.log(response);
			if(typeof callback === 'function'){
				callback(response.articles);
			}
		});
	}
}


document.addEventListener("DOMContentLoaded", function(){
	new NewsViewer();
});


/*
1) Go to https://newsapi.org/
2) Press ‘Get Api Key’ on the right
3) Enter your desired creds and promise to add an attribution link to newsapi
4) Press submit and store your API key - this one will be used for api requests
5) Test you did well - https://newsapi.org/v1/articles?source=bbc-news&apiKey={{YOUR_API_KEY}}
6) Create application, using your github page on your github account: https://pages.github.com/
7) Using es6 knowledge create an application that uses newsapi, which will run purely on the client-side in Chrome-54 browser (no server-side work expected). Your app should get all the news in the available section and display them;
8) Score points for every usage of the es6, but points will be descored for prehistoric things (such as XMLHttpRequest);
9) Styling is not the requirement for this task, but it will be an additional bonus;
10) You're not allowed to use any framework :)
11) Add attribution link, remember, you promised!
*/
