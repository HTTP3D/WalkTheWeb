/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* work in progress - event listeners that can be used instead of code Hooks */

WTWJS.prototype.addEventListener = function(zevent, zfunction, zparameters, zsort, ztype) {
	try {
		/* type = override, append (default), or wtw (original function) */
		
		
	} catch (ex){
		WTW.log('core-scripts-prime-wtw_listeners.js-addEventListener=' + ex.message);
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
		WTW.log('core-scripts-prime-wtw_listeners.js-newListener=' + ex.message);
	}
	return listener;
}




