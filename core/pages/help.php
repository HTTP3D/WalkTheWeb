<!DOCTYPE html>
<html>
<head>
	<title>Walk the Web (TM) - Help</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<link rel="stylesheet" type="text/css" href="/core/styles/wtw_help.css" />    
	<script type="text/javascript">
		function WTWJS() {
			this.adminView = 0;
		}
		var WTW = new WTWJS();
		var wtw_devmode = '1';

		function dGet(k) {
			return document.getElementById(k);
		}

		function WTW.log(ztxt) {
			if (wtw_devmode == '1') {
				console.log(ztxt);
			}
		}

		WTWJS.prototype.getQuerystring = function(zkey, zdefault) {
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
				WTW.log("core-pages-help.php-getQuerystring=" + ex.message);
			}
			return zquery;
		}

		function sethelp(zhelptab) {
			var zdivs = document.getElementsByClassName('wtw-helpdiv');
			for (var i=0;i < zdivs.length;i++) {
				zdivs[i].style.display = "none";
				zdivs[i].style.visibility = "hidden";
			}
			if (dGet(zhelptab) != null) {
				dGet(zhelptab).style.display = "block";
				dGet(zhelptab).style.visibility = "visible";
			} else {
				dGet('wtw_helpmenudiv').style.display = "block";
				dGet('wtw_helpmenudiv').style.visibility = "visible";
			}
		}
	</script>
</head>
<body>
	<div class="wtw-center"><h1>Walk the Web - Help</h1></div>
	
	<div id="wtw_helpmenu">
		<h2 onclick="sethelp('wtw_helpmenudiv');" class="wtw-right">Help Menu - Index</h2>
		<div id="wtw_helpmenudiv" class="wtw-helpdiv"><br />
			<h2>Help Menu</h2>
			<h3 onclick="sethelp('wtw_home');">Home Page</h3>
			<h3 onclick="sethelp('wtw_admingettingstarted');">Welcome - Getting Started</h3>
			<h3 onclick="sethelp('wtw_adminhome');">My 3D Websites - Home Page</h3>
			<h3 onclick="sethelp('wtw_adminbuildings');">3D Building Websites</h3>
			<h3 onclick="sethelp('wtw_admincommunities');">3D Community Websites</h3>
			<h3 onclick="sethelp('wtw_adminbuildvscomm');">3D Buildings Vs. 3D Communities</h3>
			<h3 onclick="sethelp('wtw_adminbuildingblocks');">3D Building Blocks</h3>
			<h3 onclick="sethelp('wtw_adminwebobjects');">3D Web Objects</h3>
			<h3 onclick="sethelp('wtw_adminthings');">3D Things</h3>
		</div>
	</div><br />
	<div class="wtw-clear"></div>
	<div id="wtw_home" class="wtw-helpdiv">
		<h2>Home Page</h2>
		This is the main browsing home page.<br /><br />
		<div style="float:left;min-width:3%;margin-top:30px;">
		</div>
		<div style="float:right;min-width:13%;margin-top:30px;">
			<b>Login - Logout</b><br />
			<br />
			Help and Settings<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			Compass for direction<br />
			and arrow to closest<br />
			3D Building
			</div>
		<div style="width:75%;margin-left:5%;">
			<div style="text-align:center;width:100%;"><b>Main Browsing Page</b></div>
			<img src="/content/system/images/homescreen.jpg" class="wtw-imgfull" style="width:80%;height:auto;" />
			<div style="text-align:center;width:100%;">
				<b>HTTP3D Logo</b> and current 3D Community
				<div style="margin-left:10%;margin-right:20%;display:inline;">Movement Direction</div>
				Closest 3D Building
			</div>
		</div><br /><br /><br />
		To begin creating or editting 3D Building Websites, please Login, then select "My 3D Websites" button near the top right of your window.
	</div>
	<div id="wtw_admingettingstarted" class="wtw-helpdiv">
		<h2>Welcome to 3D Website Admin</h2>
		This <b>Help</b> can be displayed from the <b>Help and Settings</b> link on the right at any time.<br /><br />
		Select the <b>Help Menu</b> link on the left will display the general <b>Help</b> topics.<br /><br />
		<h3>Congratulations, you have a 3D Building and 3D Community Website!</h3>
		So, what is next?<br /><br />
		Currently you are editing your 3D Community. Click <b>Community Tools</b> on the top menu, then use 3D Building Blocks, 3D Web Objects, and 3D Things to customize your 3D Community.<br /><br />
		<h3 onclick="sethelp('wtw_adminbuildingblocks');" onmouseover="this.style.color='blue';" onmouseout="this.style.color='black';"><u>3D Building Blocks</u></h3>
			3D geometric shapes used to create 3D Communities, 3D Buildings, and 3D Things.<br />
		<h3 onclick="sethelp('wtw_adminwebobjects');" onmouseover="this.style.color='blue';" onmouseout="this.style.color='black';"><u>3D Web Objects</u></h3>
			3D geometric shapes that simulate traditional Web Functionality; scrolling Blogs, Image Buttons, Posting Forms...<br />
		<h3 onclick="sethelp('wtw_adminthings');" onmouseover="this.style.color='blue';" onmouseout="this.style.color='black';"><u>3D Things</u></h3>
			Download or combine your own 3D geometric shapes to make assemblies such as tables, chairs, trees, bushes...<br /> 
	</div>
	<div id="wtw_adminhome" class="wtw-helpdiv">
		<h2>My 3D Websites - Home Page</h2>
		This is the HTTP3D Editor main page.<br /><br />
		<div style="float:left;min-width:8%;margin-top:30px;">
			<b>Sub Menu</b><br />
			Items change based<br /> 
			on availability and<br />
			top Main Menu selections
		</div>
		<div style="float:right;min-width:8%;margin-top:30px;">
			<b>Logout</b><br />
			<br />
			Help and Settings</div>
		<div style="width:75%;margin-left:10%;">
			<div style="text-align:center;width:100%;"><b>Main Menu Options</b></div>
			<img src="/content/system/images/adminscreen.jpg" class="wtw-imgfull" style="width:80%;height:auto;" />
			<div style="text-align:center;width:100%;">
				<b>HTTP3D Logo</b>
				<div style="margin-left:25%;margin-right:15%;display:inline;">Movement Direction</div>
				Current Loaded Scene Information
			</div>
		</div>
	</div>
	<div id="wtw_adminbuildings" class="wtw-helpdiv">
		<h2>3D Building Websites</h2>
		A "Building" is a single 3D structure with all of its parts. It can be a house, building, wall, tower, shack, tree, sign, or anything else you wish to create. You can create as many buildings as you like.<br /><br />
	</div>
	<div id="wtw_admincommunities" class="wtw-helpdiv">
		<h2>3D Community Websites</h2>
		A "Community" is where we can display one or more buildings with all of the surrounding and connecting items such as roads, sidewalks, trees, brush, street signs, bridges, landscape, mountains, or anything else you wish to create. You can also create as many communities as you like.<br /><br />
	</div>
	<div id="wtw_adminbuildvscomm" class="wtw-helpdiv">
		<h2>3D Buildings Vs. 3D Communities</h2>
		The top menu is divided into two major sections; 3D Buildings and 3D Communities.  When you select one or the other, additional related menu items will appear. For most top menu items, there are also corresponding options that will appear on the left side of the screen.<br /><br />
		<h3>Bring it Together</h3>
		One 3D Building can be added to multiple 3D Communities. Any changes you make to a 3D Building will automatically be shown in all of the 3D Communities containing that 3D Building.<br /><br />
	</div>
	<div id="wtw_adminbuildingblocks" class="wtw-helpdiv">
		<h2>3D Building Blocks</h2>
		3D Building Blocks are the 3D geometric shapes that are combined to make 3D Things, 3D Buildings, 3D Communities. <br />They include but are not limited to:
		<ul>
			<li>Boxes (Walls, Floors, cubes, etc.)</li>
			<li>Spheres</li>
			<li>Cylinders</li>
			<li>Torus (Donut)</li>
			<li>Triangles</li>
			<li>Planes (Flat Rectangle)</li>
			<li>Disc (Flat Round or Oval Plane)</li>
			<li>Tubes</li>
			<li>Lines</li>
		</ul>
		<h3>Add a 3D Building Block</h3>
		To <b>add</b> a 3D Building Block, select Building Tools from the top menu, then select <b>Add Shape to Building</b>. A new 3D Shape will immediately appear directly in front of you along with a settings window. Using the buttons, you can position, size, and rotate the 3D Shape. There are additional options to select a texture and other object specific settings in the display. When ready, click save.<br /><br />
		<h3>Edit an Existing 3D Building Block</h3>
		To <b>edit</b> an existing 3D Building Block, use your right mouse button to select it. The settings window will appear. Now you can make your changes. When completed, click "Save" or you will lose your changes.<br /><br />
		<h3>Copy a 3D Building Block</h3>
		To <b>copy</b> a 3D Building Block, use your right mouse button to select it. The settings window will appear. Near the bottom, select the "Copy this Item" button.
		<h3>Delete a 3D Building Block</h3>
		To <b>delete</b> a 3D Building Block, use your right mouse button to select it. The settings window will appear. Near the bottom, select the "Delete" button.
	</div>
	<div id="wtw_adminwebobjects" class="wtw-helpdiv">
		<h2>3D Web Objects</h2>
		3D Web Objects are 3D versions of Internet web page features like images, links, text, buttons, form fields, etc.<br /><br />
		<h3>Add a 3D Web Object</h3>
		To <b>add</b> a 3D Web Object, select Building Tools from the top menu, then select <b>Add Web Objects</b> from the options on the left to see the selection list of 3D Web Objects. When selected, a new 3D Web Object will immediately appear directly in front of you along with a settings window. Using the buttons, you can position, size, and rotate the 3D Web Object. There are additional options to select a texture and other object specific settings in the display. When ready, click save.<br /><br />
		<h3>Edit an Existing 3D Web Object</h3>
		To <b>edit</b> an existing 3D Web Object, use your right mouse button to select it. The settings window for the 3D Web Object will appear.<br /><br />
		<h3>Delete a 3D Web Object</h3>
		To <b>delete</b> a 3D Web Object, use your right mouse button to select it. The settings window for the 3D Web Object will appear. Near the bottom, select the "Delete" button.<br /><br />
	</div>
	<div id="wtw_adminthings" class="wtw-helpdiv">
		<h2>3D Things</h2>
		3D Things are creations of multiple 3D Building Blocks and/or 3D Web Objects. 3D Things allow you to create once and use many times. You also have the option to Share or Download additional 3D Things. Here are some examples of 3D Things: Tables, Chairs, Trees, Bushes, Desks, Lights, etc...<br /><br />
		<h3>Create or Download a 3D Thing</h3>
		To <b>create</b> or <b>download</b> a 3D Thing, select 3D Things from the top menu, then select <b>Create New 3D Thing</b> from the options on the left to see the selection list of 3D Things including a <b>New 3D Thing from Scratch</b>. When selected, a new 3D Thing will immediately appear directly in front of you along with a settings window. Name your new 3D Thing and click save. Once you create or download a 3D Thing, you can modify or change it any way you like. Keep in mind that when you place it in a 3D Building or 3D Community any changes you make here will update the 3D Thing everywhere. You can always create a copy of a 3D Thing to have a new Instance for changes without affecting the original 3D Thing.<br /><br />
		<h3>Add a 3D Thing to a 3D Building or 3D Community</h3>
		To <b>add</b> a 3D Thing, select Building or Community Tools from the top menu, then select <b>Add 3D Things</b> from the options on the left to see the selection list of 3D Things. When selected, a new 3D Thing will immediately appear directly in front of you along with a settings window. Using the buttons, you can position, size, and rotate the 3D Thing. When ready, click save.<br /><br />
		<h3>Edit an Existing 3D Web Object</h3>
		To <b>edit</b> an existing 3D Thing, use your right mouse button to select it. The settings window for the 3D Thing will appear.<br /><br />
		<h3>Delete a 3D Web Object</h3>
		To <b>delete</b> a 3D Thing, use your right mouse button to select it. The settings window for the 3D Thing will appear. Near the bottom, select the "Delete" button.<br /><br />
	</div>

	<script type="text/javascript">
		window.onload = function () {
			try {
				var zhelptab = WTW.getQuerystring("helptab", "");
				if (zhelptab != "") {
					sethelp(zhelptab);
				}
			} catch (ex) {
				WTW.log("core-pages-help.php=" + ex.message);
			}
		}
	</script>
</body>
</html>