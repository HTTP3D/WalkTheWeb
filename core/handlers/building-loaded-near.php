<?php
header('Set-Cookie: cross-site-cookie=name; SameSite=Lax;');
?>
<html>
<head>
<title>Analytics - 3D Building Loaded at Near Distance</title>
<script type="text/javascript">
	function getQuerystring(key, default_) {
		var squery = "";
		try {
			if (default_ == null) default_ = "";
			key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
			var qs = regex.exec(window.location.href);
			if (qs == null) {
				squery = default_;
			} else {
				squery = qs[1];
			}
		} catch (ex) {
			console.log(ex.message);
		}
		return squery;
	}
	var analyticsid = getQuerystring('analyticsid', '');
	if (analyticsid != '') {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		ga('create', analyticsid, 'auto');
		ga('send', 'pageview');
	}
</script>
</head>
<body>
Analytics - 3D Building Loaded at Near Distance

	<input type='hidden' id='wtw_iframename' name='wtw_iframename' maxlength="64" />

</body>
</html>