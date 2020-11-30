<?php
	$videosrc = "";
	if(isset($_GET["videosrc"]) && !empty($_GET["videosrc"])) {
		$videosrc = $_GET["videosrc"];
	}
	$videoextension = pathinfo($videosrc,PATHINFO_EXTENSION);
	
?>

<html>
<head>
	<title>WalkTheWeb Video Player - Full Screen</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
</head>
<body style="background-color:#000000;">
<div style="text-align:center;margin:0px;padding:0px;">
<video id="wtw_videoplayer" controls height="100%" width="auto">
  <source src="<?php echo $videosrc; ?>" type="video/<?php echo $videoextension; ?>">
  Your browser does not support the video tag.
</video>
</div>
</body>
</html>
<script type="text/javascript">
	function exitHandler() {
		if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
			try {
				document.getElementById('wtw_videoplayer').pause();
				//window.parent.WTW.closeIFrame();
			} catch(ex) {}
		}
	}
	if (document.addEventListener) {
		document.addEventListener('webkitfullscreenchange', exitHandler, false);
		document.addEventListener('mozfullscreenchange', exitHandler, false);
		document.addEventListener('fullscreenchange', exitHandler, false);
		document.addEventListener('MSFullscreenChange', exitHandler, false);
	}
	
	window.onload = function () {
		try {
/*			if (document.getElementById('wtw_videoplayer').requestFullscreen) {
			  document.getElementById('wtw_videoplayer').requestFullscreen();
			} else if (document.getElementById('wtw_videoplayer').mozRequestFullScreen) {
			  document.getElementById('wtw_videoplayer').mozRequestFullScreen();
			} else if (document.getElementById('wtw_videoplayer').webkitRequestFullscreen) {
			  document.getElementById('wtw_videoplayer').webkitRequestFullscreen();
			} */
			
/*			var zplayer = document.getElementById('wtw_videoplayer');

			if (!window.isFs) {
				window.isFs = true;
				var zenter = zplayer.requestFullscreen || zplayer.webkitRequestFullscreen || zplayer.mozRequestFullScreen || zplayer.oRequestFullscreen || zplayer.msRequestFullscreen;
				zenter.call(zplayer);
			} else {
				window.isFs = false;
				var zexit = zplayer.exitFullScreen || zplayer.webkitExitFullScreen || zplayer.mozExitFullScreen || zplayer.oExitFullScreen || zplayer.msExitFullScreen;
				zexit.call(zplayer);
			}
*/			
		} catch(ex) {}
		try {
			document.getElementById('wtw_videoplayer').play();
		} catch(ex) {}
	}
</script>