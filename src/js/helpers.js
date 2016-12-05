let helpers = {
	setAppState(state){
		document.body.classList.add(state);
	},
	unsetAppState(state){
		document.body.classList.remove(state);
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
}

export default helpers;
