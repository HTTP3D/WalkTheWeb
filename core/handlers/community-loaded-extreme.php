<?php
header('Set-Cookie: cross-site-cookie=name; SameSite=Lax;');
?>
<html>
<head>
<title>Analytics - 3D Community Loaded at Extreme Distance</title>
<script type="text/javascript">
	function getQuerystring(zkey, zdefault) {
		var zquery = "";
		try {
			if (zdefault == null) zdefault = "";
			zkey = zkey.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var zregex = new RegExp("[\\?&]" + zkey + "=([^&#]*)");
			var zqs = zregex.exec(window.location.href);
			if (zqs == null) {
				zquery = zdefault;
			} else {
				zquery = zqs[1];
			}
		} catch (ex) {
			console.log(ex.message);
		}
		return zquery;
	}
	var zanalyticsid = getQuerystring('analyticsid', '');
	if (zanalyticsid != '') {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		ga('create', zanalyticsid, 'auto');
		ga('send', 'pageview');
	}
</script>
</head>
<body>
	Analytics - 3D Community Loaded at Extreme Distance

	<input type='hidden' id='wtw_iframename' name='wtw_iframename' maxlength="64" />

</body>
</html>