/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTWJS.prototype.initEvents = function() {
	try {
		dGet('wtw_renderCanvas').addEventListener("click", WTW.mouseClick);
		window.addEventListener("onkeydown", WTW.keyDown,true);
		window.addEventListener("keydown", WTW.keyDown);		
		window.addEventListener("onkeyup", WTW.keyUp,true);
		window.addEventListener("keyup", WTW.keyUp);	
		if ("onmousewheel" in document) {
			window.addEventListener("mousewheel", WTW.mouseScroll1,true);
			//window.addEventListener("wheel", mouseScroll);		
		} else {
			window.addEventListener("DOMMouseScroll", function(e) {	WTW.mouseScroll2(e); });
		}
		dGet('wtw_renderCanvas').addEventListener("pointerdown", WTW.mouseDown);
		dGet('wtw_renderCanvas').addEventListener("pointerup", WTW.mouseUp);
		dGet('wtw_renderCanvas').addEventListener("pointermove", WTW.mouseMove);
		dGet('wtw_renderCanvas').addEventListener("mousedown", WTW.mouseDown);
		dGet('wtw_renderCanvas').addEventListener("mouseup", WTW.mouseUp);
		dGet('wtw_renderCanvas').addEventListener("mousemove", WTW.mouseMove);
		window.addEventListener("contextmenu", WTW.mouseRight);
		window.addEventListener('touchstart', WTW.touchDown, false);
		window.addEventListener('touchend', WTW.touchUp, false);
		window.addEventListener('touchmove', WTW.touchMoving, false);
		window.addEventListener('touchcancel', WTW.touchCancel, false);
		window.addEventListener('touchleave', WTW.touchCancel, false); 
		window.addEventListener("beforeunload", WTW.beforeUnload,false);
		if (window.addEventListener) {
			window.addEventListener("message", WTW.onMessage, false);        
		} else if (window.attachEvent) {
			window.attachEvent("onmessage", WTW.onMessage, false);
		}
	} catch (ex) {
		WTW.log("init-initEvents=" + ex.message);
	}
}

window.onload = function() {
	try {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', wtw_googleanalytics, 'auto');
		ga('send', 'pageview');
		
		if (typeof WTW.setWindowSize == 'function') {
			WTW.setWindowSize();
		}
		if (typeof WTW.initEvents == 'function') {
			WTW.initEvents();
		}
		if (typeof WTW.initLoadSequence == 'function') {
			WTW.initLoadSequence();
		}
		if (typeof WTW.accessDenied == 'function') {
			WTW.accessDenied();
		}
	} catch (ex) {
		WTW.log("init-onload=" + ex.message);
	}
}
window.onresize = function () {
	try {
		if (typeof WTW.setWindowSize == 'function') {
			WTW.setWindowSize();
		}
	} catch (ex) {
		WTW.log("init-onresize=" + ex.message);
	}
}
