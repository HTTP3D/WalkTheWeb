<div id="wtw_adminmenu29b" class="wtw-hide">
	<h2>Template Name</h2>
	<input type="text" id="wtw_tsharecommtempname" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
	<br /><br />
	<h2>Description</h2>
	<textarea id="wtw_tsharecommdescription" rows="4" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);"></textarea><br />
	<br /><br />
	<h2>Search Category Tags</h2>
	<input type="text" id="wtw_tsharecommtags" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
	<div style="font-weight:normal;font-size:.8em;color:#c0c0c0;">Example: Desert, Mountains, Islands, Forest, River, Snow, Spring, Fall, etc</div>
	<br /><br />
	<div id="wtw_bsnapshotcommunity" class='wtw-menulevel2' onclick="WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/communities/' + dGet('wtw_tcommunityid').value + '/snapshots/', 'defaultcommunity.png');" style="cursor: pointer;">Set Default Snapshot</div><br />
	<img id="wtw_defaultcommunitysnapshot" class="wtw-snapshot" />
	<br /> 
	<div id="wtw_sharecommunityresponse" style="font-size:1.5em;color:green;"></div><br />
	<br /> 
</div>
