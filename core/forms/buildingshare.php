<div id="wtw_adminmenu9b" class="wtw-hide">
	<h2>Template Name</h2>
	<input type="text" id="wtw_tsharebuildtempname" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
	<br /><br />
	<h2>Description</h2>
	<textarea id="wtw_tsharebuilddescription" rows="4" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);"></textarea><br />
	<br /><br />
	<h2>Search Category Tags</h2>
	<input type="text" id="wtw_tsharebuildtags" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
	<div style="font-weight:normal;font-size:.8em;color:#c0c0c0;">Example: business, store, house, single floor, blue, wood, etc</div>
	<br /><br />
	<div id="wtw_bsnapshotbuilding" class='wtw-menulevel2' onclick="WTW.snapshot3D(dGet('wtw_tcontentpath').value + '\\uploads\\buildings\\' + dGet('wtw_tbuildingid').value + '\\snapshots\\', 'defaultbuilding.png');" style="cursor: pointer;">Set Default Snapshot</div><br />
	<img id="wtw_defaultbuildingsnapshot" class="wtw-snapshot" />
	<br /> 
	<div id="wtw_sharebuildingresponse" style="font-size:1.5em;color:green;"></div><br />
	<br /> 
</div>