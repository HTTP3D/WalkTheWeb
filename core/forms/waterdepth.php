<!-- admin menu form for editing the water depth in a 3D Community Scene -->
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
	<div class="wtw-menulevel0text" style="text-align:left;font-size:.8em"><strong>Zero (0)</strong> Extended Land height removes water from the 3D Community.<br /><br />
	Setting a value <strong>less than zero</strong> will show water in your 3D Community.<br /><br />
	<strong>Extended Land</strong> is the continuous land that is always under your Avatar and keeps you from falling off the end of the ground. This does not change the height of other Land Terrain you may have added.</div>
	<br />
	<br />
	<div id="wtw_wateradvancedoptslink" onclick="WTW.toggleAdvanced(this, 'wtw_wateradvancedopts');" class="wtw-showhideadvanced">-- Show Advanced Options --</div>
	<div id="wtw_wateradvancedopts" style="display:none;visibility:hidden;">
		<br /><br />
		<h4 style="margin-bottom:3px;">Water Texture Bump Image</h4>
		<div class="wtw-mainmenuvalue">Bump map texture that will apply to the Water. (optional)</div><br />
		<img id="wtw_waterbumppreview" class='wtw-previewimage' src="" /><br />
		<div id="wtw_changewaterbumptexture" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Water Bump Map</div>
		<br />
		<br />
		<hr class="wtw-menuhr" />

		<div class="wtw-onecol">Bump Height (up,-down)<br />
			<input type="text" id="wtw_twaterbumpheight" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwatery4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_twaterbumpheight', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatery3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_twaterbumpheight', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatery2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_twaterbumpheight', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatery1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_twaterbumpheight', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Water Subdivisions (for Bump Map)<br />
			<input type="text" id="wtw_twatersubdivisions" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwatersub4" class="wtw-smallprint" value="-10" onmousedown="WTW.changeNumberValue('wtw_twatersubdivisions', -10);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatersub3" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_twatersubdivisions', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatersub2" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_twatersubdivisions', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatersub1" class="wtw-smallprint" value="+10" onmousedown="WTW.changeNumberValue('wtw_twatersubdivisions', 10);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Wave Height (up,-down)<br />
			<input type="text" id="wtw_twaterwaveheight" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwavey4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_twaterwaveheight', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwavey3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_twaterwaveheight', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwavey2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_twaterwaveheight', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwavey1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_twaterwaveheight', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Wave Length (front,-back)<br />
			<input type="text" id="wtw_twaterwavelength" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwavez4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_twaterwavelength', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwavez3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_twaterwavelength', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwavez2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_twaterwavelength', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwavez1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_twaterwavelength', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<hr class="wtw-menuhr" />

		<h4 style="margin-bottom:3px;">Water Color (Refractive)</h4>
		<div class="wtw-mainmenuvalue">(Example: #23749C)</div><br />
		<input type="text" id="wtw_twatercolorrefraction" maxlength="7" class="wtw-smallprintinput"  onfocus="WTW.openWaveColorSelector();" onblur="WTW.closeColorSelector(false);WTW.setGroundWater();" onchange="WTW.setGroundWater();" onkeyup="WTW.setGroundWater();" />
		<br /><br />
		<div class="wtw-onecol">Color Blend Factor (Refractive)<br />
			<input type="text" id="wtw_twatercolorblendfactor" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwatercolor4" class="wtw-smallprint" value="-.1" onmousedown="WTW.changeNumberValue('wtw_twatercolorblendfactor', -.1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatercolor3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_twatercolorblendfactor', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatercolor2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_twatercolorblendfactor', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatercolor1" class="wtw-smallprint" value="+.1" onmousedown="WTW.changeNumberValue('wtw_twatercolorblendfactor', .1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />

		<h4 style="margin-bottom:3px;">Water Color (Reflective)</h4>
		<div class="wtw-mainmenuvalue">(Example: #52BCF1)</div><br />
		<input type="text" id="wtw_twatercolorreflection" maxlength="7" class="wtw-smallprintinput"  onfocus="WTW.openWaveColorSelector();" onblur="WTW.closeColorSelector(false);WTW.setGroundWater();" onchange="WTW.setGroundWater();" onkeyup="WTW.setGroundWater();" />
		<br /><br />
		<div class="wtw-onecol">Color Blend Factor (Reflective)<br />
			<input type="text" id="wtw_twatercolorblendfactor2" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwatercolor24" class="wtw-smallprint" value="-.1" onmousedown="WTW.changeNumberValue('wtw_twatercolorblendfactor2', -.1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatercolor23" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_twatercolorblendfactor2', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatercolor22" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_twatercolorblendfactor2', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwatercolor21" class="wtw-smallprint" value="+.1" onmousedown="WTW.changeNumberValue('wtw_twatercolorblendfactor2', .1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		
		<hr class="wtw-menuhr" />
		<div class="wtw-onecol">Wind Force (strength)<br />
			<input type="text" id="wtw_twaterwindforce" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwindforce4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_twaterwindforce', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindforce3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_twaterwindforce', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindforce2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_twaterwindforce', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindforce1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_twaterwindforce', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Wind Direction Z (left,-right)<br />
			<input type="text" id="wtw_twaterwinddirectionz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwindz4" class="wtw-smallprint" value="-.1" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectionz', -.1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindx3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectionz', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindz2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectionz', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindz1" class="wtw-smallprint" value="+.1" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectionz', .1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Wind Direction X (front,-back)<br />
			<input type="text" id="wtw_twaterwinddirectionx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwindx4" class="wtw-smallprint" value="-.1" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectionx', -.1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindx3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectionx', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindx2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectionx', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindx1" class="wtw-smallprint" value="+.1" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectionx', .1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<div class="wtw-onecol">Wind Direction Y (up,-down)<br />
			<input type="text" id="wtw_twaterwinddirectiony" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwindy4" class="wtw-smallprint" value="-.1" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectiony', -.1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindy3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectiony', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindy2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectiony', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwindy1" class="wtw-smallprint" value="+.1" onmousedown="WTW.changeNumberValue('wtw_twaterwinddirectiony', .1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		<hr class="wtw-menuhr" />

		
		<div class="wtw-onecol">Opacity (0-transparent, 100-solid)<br />
			<input type="text" id="wtw_twateralpha" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGroundWater();" />
			<input type="button" id="wtw_beditwateralpha4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_twateralpha', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwateralpha3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_twateralpha', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwateralpha2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_twateralpha', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			<input type="button" id="wtw_beditwateralpha1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_twateralpha', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
		</div><br />
		
	</div>
</div>