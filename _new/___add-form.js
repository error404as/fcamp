(function(){

	function $(id){
		return document.getElementById(id);
	}

	function formatURL(){
		var link = $('post_permalink').value.trim();
		$('post_permalink').value = link;

		var result = window.location.host || '';
		if(result){
			result = window.location.protocol + '//' + result;
		}
		result += '/post/'+link;
		$('post_permalink_preview').innerHTML = result;
	}

	function setViewDate(d){
		var date = new Date(d);
		var offset = date.getTimezoneOffset() * 60 * 1000;
		var string = new Date( date-offset ).toISOString();
		var stringDate = string.substring(0, string.lastIndexOf(':')).replace('T', ' ');
		return stringDate;
	}

	function checkRequired(form){
		var elems = form.querySelectorAll('[required]');
		var has_errors = false;
		for(var i = 0, len = elems.length; i < len; i++){
			if(elems[i].value.trim()){
				elems[i].classList.remove('error');
			} else {
				has_errors = true;
				elems[i].classList.add('error');
			}
		}
		return has_errors;
	}

	function requiredChecker(){
		if(this.classList.contains('error') && this.value.trim()){
			this.classList.remove('error');
		}
	}

	function setDateInit(){
		var date = $('post_date_utc').value ? new Date($('post_date_utc').value) : new Date();
		$('post_date').value = setViewDate(date);
		$('post_date_utc').value = date.toISOString();
	}


	formatURL();
	setDateInit();


	$('post_date').addEventListener('change', function(){
		try{

			var val = this.value.trim();
			if(val.indexOf(':') === -1){
				val += ' 00:00';
			}

			if(new Date('2016-12-15T17:08').toISOString().indexOf('2016-12-15T17:08') !== 0){
				// I know, this is IE ;)
				val = val.replace(' ','T');
			}

			$('post_date_utc').value = new Date(val).toISOString();
		}catch(e){ }

		// any case, format and re-set to input
		$('post_date').value = setViewDate($('post_date_utc').value);
	}, true);

	$('post_image').addEventListener('change', function(){ console.log(this.value) }, true);
	$('post_headline').addEventListener('change', requiredChecker, true);
	$('post_body').addEventListener('change', requiredChecker, true);
	$('post_permalink').addEventListener('input', formatURL, true);
	$('post_permalink').addEventListener('change', formatURL, true);
	$('post_permalink').addEventListener('change', requiredChecker, true);

	$('add_post').addEventListener('submit', function(e){
		

		// most errors will be catch by [required] attr, but need more validations here
		var has_errors = checkRequired(this);

		if(has_errors){
			e.preventDefault();
			return false;
		} else {
			$('post_headline').value = $('post_headline').value.trim();
			$('post_tags').value = $('post_tags').value.trim();
		}

		//var data = {
		//	title: $('post_headline').value.trim(),
		//	body: $('post_body').value,
		//	tags: $('post_tags').value.trim(),
		//	permalink: $('post_permalink').value,
		//	date: $('post_date_utc').value,
		//	image: $('post_image_view') ? $('post_image_view').getAttribute('src') : '',
		//};
//
		//if(data.tags){
		//	data.tags = data.tags.split(',').map(function(itm){ return itm.trim() }).filter(function(itm){ return itm });
		//}


	});
})();