<html>
<head>
	<title>Register</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<script>
		var accesstoken = "";
		function onRegister() {
			try {
				var zrequest = {
					'name':document.getElementById('name').value,
					'email':document.getElementById('email').value,
					'password':document.getElementById('password').value,
					'c_password':document.getElementById('c_password').value
				};
				postJSON("https://secure.walktheweb.com/api/register", zrequest, false,
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						if (zresponse.success != null) {
							if (zresponse.success.token != null) {
//console.log("token=" + zresponse.success.token);
								accesstoken = zresponse.success.token;
							}
						}
					}
				);
			} catch (ex) {
				console.log("register-onRegister=" + ex.message);
			}
		}
		
		function onLogin() {
			try {
				var zrequest = {
					'email':document.getElementById('email2').value,
					'password':document.getElementById('password2').value,
				};
				postJSON("https://secure.walktheweb.com/api/login", zrequest, false,
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						if (zresponse.success != null) {
							if (zresponse.success.token != null) {
//console.log("token=" + zresponse.success.token);
								accesstoken = zresponse.success.token;
							}
						}
					}
				);
			} catch (ex) {
				console.log("register-onLogin=" + ex.message);
			}
		}

		function getUser() {
			try {
				var zrequest = {};
				postJSON("https://secure.walktheweb.com/api/details", zrequest, true,
					function(zresponse) {
//console.log(zresponse);
					}
				);
			} catch (ex) {
				console.log("register-getUser=" + ex.message);
			}
		}

		function logout() {
			try {
				var zrequest = {};
				postJSON("https://secure.walktheweb.com/api/logout", zrequest, true,
					function(zresponse) {
//console.log(zresponse);
					}
				);
			} catch (ex) {
				console.log("register-getUser=" + ex.message);
			}
		}

		function postJSON(zurl, zrequest, zauth, zcallback) {
			try {
				var form1 = document.createElement('form');
				var Httpreq = new XMLHttpRequest();
				var zformdata = new FormData(form1);
				for(var zkey in zrequest) {
					zformdata.append(zkey, zrequest[zkey]);
				}
				zformdata.append('action', 'POST');
				Httpreq.open('POST', zurl);
				if (zauth == true) {
					Httpreq.setRequestHeader('Accept','application/json');
					Httpreq.setRequestHeader('Authorization','Bearer ' + accesstoken);
				}
				Httpreq.onreadystatechange = function () {
					if (Httpreq.readyState == 4 && Httpreq.status == "200") {
						zcallback(Httpreq.responseText);
					} else if (Httpreq.readyState == 4 && (Httpreq.status == "401" || Httpreq.status == "405")) {
						var serror = "{\"error\": \"Unauthorized\"}";
						zcallback(serror);
					}
				};
				Httpreq.send(zformdata);  
			} catch (ex) {
				console.log("register-postJSON=" + ex.message);
			}
		}			

		function getJSON(zurl, zcallback, zaction, zrequest) {
			try {
				if (zaction == undefined) {
					zaction = 'GET';
				}
				if (zrequest == undefined) {
					zrequest = null;
				}
				var Httpreq = new XMLHttpRequest();
				Httpreq.overrideMimeType("application/json");
				Httpreq.open(zaction, zurl, true);
				Httpreq.setRequestHeader('Accept','application/json');
				Httpreq.setRequestHeader('Authorization','Bearer ' + accesstoken);
				Httpreq.onreadystatechange = function () {
					if (Httpreq.readyState == 4 && Httpreq.status == "200") {
						zcallback(Httpreq.responseText);
					} else if (Httpreq.readyState == 4 && (Httpreq.status == "401" || Httpreq.status == "405")) {
						var serror = "{\"error\": \"Unauthorized\"}";
						zcallback(serror);
					}
				};
				Httpreq.send(zrequest);  
			} catch (ex) {
				console.log("register-getJSON=" + ex.message);
			}
		}		
	</script>
</head>
<body>
<br /><br />
<div style="text-align:center;">
	<form id="form1">
		<h2>Register</h2>
		Name: <input type="text" id="name" value="adishno" /><br />
		Email: <input type="text" id="email" value="adishno@walktheweb.com" /><br />
		Password: <input type="password" id="password" value="kjdsh32789jHD#63!8" /><br />
		Repeat Password: <input type="password" id="c_password" value="kjdsh32789jHD#63!8" /><br />
		<input type="button" id="bregister" value="Register" onclick="onRegister();" />
	</form>
	<hr /><br />
	<form id="form2">
		<h2>Login</h2>
		Email: <input type="text" id="email2" value="adishno@walktheweb.com" /><br />
		Password: <input type="password" id="password2" value="kjdsh32789jHD#63!8" /><br />
		<input type="button" id="blogin" value="Login" onclick="onLogin();" />
	</form>
	<hr /><br />
	<form id="form3">
		<h2>User</h2>
		<input type="button" id="bgetuser" value="Get User" onclick="getUser();" />
	</form>
	<hr /><br />
	<form id="form4">
		<h2>Log Out</h2>
		<input type="button" id="blogout" value="Logout User" onclick="logout();" />
	</form>
</div>
</body>
</html>