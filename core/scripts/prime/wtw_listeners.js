WTWJS.prototype.addEventListener = function(zevent, zfunction, zparameters, zsort, ztype) {
	try {
		/* type = override, append (default), or wtw (original function) */
		
		
	} catch (ex){
		WTW.log("core-scripts-prime-wtw_listeners.js-addEventListener=" + ex.message);
	}
}

WTWJS.prototype.newListener = function() {
	let listener = '';
	try {
		listener = {
			'function':'',
			'parameters':null,
			'sort':50,
			'type':'append',
			'typeind':1
		};
	} catch (ex){
		WTW.log("core-scripts-prime-wtw_listeners.js-newListener=" + ex.message);
	}
	return listener;
}




