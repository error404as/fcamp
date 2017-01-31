
function pageBuilder(active, total){
	var result = [];
	for(var i = 1; i <= total; i++){
		result.push({
			page: i,
			isActive: (i===active)
		})
	}
	return result;
}

export const pager = function(){

	var result = function(input, active) {
		if(active){
			return '<b>'+input+'</b>';
		}
		return input;
	};
	return result;

}
