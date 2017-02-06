export const pager = function(){

	var result = function(input, active) {
		if(active){
			return '<b>'+input+'</b>';
		}
		return input;
	};
	return result;

}
