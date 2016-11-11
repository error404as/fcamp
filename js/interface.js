let App = {
	apikey: 'd3a3b4d86b5d48dd98a34ed0bcebfa07',
	sources: [
		'bbc-news', 'bloomberg', 'cnn', 'google-news', 'hacker-news', 'mtv-news',
		'national-geographic', 'polygon', 'reddit-r-all', 'reuters', 'techradar', 'the-guardian-uk',
		'the-new-york-times', 'the-telegraph', 'the-washington-post', 'time', 'usa-today'
	],
	container: document.querySelector('.view'),

	init() {

		document.querySelector('.nav').innerHTML = App.sources.map((itm) => `<a href="#${itm}">${itm}</a>`).join('');

		window.addEventListener('hashchange', App.update, true);

		App.update();

	},

	update() {

		let source = App.getSource() || 'google-news';
		document.querySelector('.header h1').dataset.source = source;
		App.container.innerHTML = 'Loading data... Please wait.';

		fetch('https://newsapi.org/v1/articles?category=technology&source='+source+'&apiKey='+App.apikey).then(function(response) {
			return response.json();
		}).then(function(response) {
			console.log(response);
			App.render(response.articles);
		});

	},

	getSource() {
		if(window.location.hash){
			let hash = window.location.hash.substring(1);
			return App.sources.indexOf(hash) !== -1 ? hash : null;
		}
		return null;
	},

	render(data) {
		App.container.innerHTML = data.map((itm) => `
			<div class="item">
				<a href="${itm.url}">
					<div class="vis"><div class="img"><img src="${itm.urlToImage || 'images/no_photo.png'}" /></div></div>
					<h2>${itm.title}</h2>
					<div class="pubdate">${App.dateToStr(itm.publishedAt)}</div>
					<p>${itm.description || ''}</p>
				</a>
			</div>`).join('');
	},

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

};


document.addEventListener("DOMContentLoaded", App.init);


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
