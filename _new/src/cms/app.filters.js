export const pager = function(){

	return (input, active) => {
		return active ? `<b>${input}</b>` : input;
	};

}
