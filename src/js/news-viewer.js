import Provider from './news-provider';
import helper from './helpers';

let noImg = require('../images/no_photo.png');

class Viewer {
	constructor(sources){
		this.nav = document.querySelector('.nav ul');
		this.container = document.querySelector('.view');
		this.sources = sources || [];

		this.initView();
		this.attachHandlers();

		this.updateView();
	}
	initView(){
		this.renderNav();
		helper.setAppState('js-ready');
	}
	attachHandlers(){
		window.addEventListener('hashchange', ()=>{
			this.updateView();
		}, true);
	}
	renderNav(){
		this.nav.innerHTML = this.sources.map((itm) => `
			<li><a href="#${itm.name}">
				<span class="img"><img src="http://i.newsapi.org/${itm.name}-m.png" alt="${itm.title}"></span>
				<span class="name">${itm.title}</span>
			</a></li>
			`).join('');
	}
	renderPlaceholder(){
		this.container.innerHTML = '<div class="loading">Loading data... Please wait.</div>';
	}
	renderItems(data){
		this.entriesStyling(()=>{
			this.container.innerHTML = data.map((itm) => `
				<div class="item">
					<a href="${itm.url}">
						<div class="vis"><div class="img"><img src="${itm.urlToImage || noImg}" /></div></div>
						<h2>${itm.title}</h2>
						<div class="pubdate">${helper.dateToStr(itm.publishedAt)}</div>
						<p>${itm.description || ''}</p>
					</a>
				</div>`).join('');
		});
	}
	updSourceName(text = 'Please select news source...'){
		document.querySelector('.header h1').setAttribute('data-source',text);
	}
	getSource() {
		if(window.location.hash){
			let hash = window.location.hash.substring(1);
			return this.sources.filter(itm => itm.name === hash).length ? hash : null;
		}
		return null;
	}
	markNav(id){
		let current = this.nav.querySelector('.active');
		let active = this.nav.querySelector('[href="#'+id+'"]');
		if(current){
			current.classList.remove('active');
		}
		if(active){
			active.parentNode.classList.add('active');
		}
	}
	updateView(){
		let source = source || this.getSource();
		if(source){
			this.fetchNews(source);
		} else {
			this.renderEmpty();
		}
	}
	renderEmpty(){
		helper.unsetAppState('has_data');
		this.updSourceName();
	}
	fetchNews(source){
		this.markNav(source);
		this.updSourceName(source);
		helper.setAppState('has_data');
		this.renderPlaceholder();
		Provider.get(source, this.renderItems.bind(this));
	}
	entriesStyling(callback){
		require.ensure([], function(){
			require('../css/view.less');
			if(typeof callback === 'function'){
				callback();
			}
		},'view');
	}
}

export default Viewer;
