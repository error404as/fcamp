class Provider {
	constructor(){
		console.log('LOG: provider init');
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

export default new Provider();
