<div id="wtw_adminmenu42b" class="wtw-hide">
	<h2 class="wtw-center">Extended Land Height</h2>
	<div style="font-size:1em;color:#c0c0c0;text-align:center;">Sets the Water Depth</div>
	<input type="text" id="wtw_tgroundpositiony" maxlength="16" class="wtw-smallprintinput" style="" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
	<input type="button" id="wtw_bgroundpositionyp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tgroundpositiony', -1);" onmouseup="WTW.changeStop();WTW.setGroundWater();" onclick="" style="cursor: pointer;" />
	<input type="button" id="wtw_bgroundpositionyp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tgroundpositiony', -.01);" onmouseup="WTW.changeStop();WTW.setGroundWater();" onclick="" style="cursor: pointer;" />
	<input type="button" id="wtw_bgroundpositionyp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tgroundpositiony', .01);" onmouseup="WTW.changeStop();WTW.setGroundWater();" onclick="" style="cursor: pointer;" />
	<input type="button" id="wtw_bgroundpositionyp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tgroundpositiony', 1);" onmouseup="WTW.changeStop();WTW.setGroundWater();" onclick="" style="cursor: pointer;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<br />
	<br />
	<div class="wtw-menulevel0text" style="text-align:left;"><strong>Zero (0)</strong> Extended Land height removes water from the 3D Community.<br /><br />
	Setting a value <strong>less than zero</strong> will show water in your 3D Community.<br /><br />
	<strong>Extended Land</strong> is the continuous land that is always under your Avatar and keeps you from falling off the end of the ground. This does not change the height of other Land Terrain you may have added.</div>
	<br />
	<br />
</div>