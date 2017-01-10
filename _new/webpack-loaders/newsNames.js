module.exports = function(content) {
    if(typeof content === 'string'){
    	try{
	    	content = JSON.parse(content).map( itm => ({name: itm, title: itm.replace(/-/g,' ')}) );
		    return JSON.stringify(content);
    	} catch(e){
    		return content;
    	}
    }
};