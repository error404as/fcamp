var req = new XMLHttpRequest();
req.open("GET", '/tags', true);
req.send(null);
req.onreadystatechange = function(){
	if(req.readyState === 4) {
		if(req.status === 200) {
			var data = JSON.parse(req.responseText);
			if(data.length){
				document.querySelector('.tags').style.display = 'block';
				document.querySelector('.js-tags').innerHTML = '<ul>' + data.map(function(itm){ return '<li><a href="/tag/'+itm._id+'">'+itm._id+'</a></li>' }).join('') + '</ul>';
			}
		}
	}
}
