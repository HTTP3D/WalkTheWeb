<!-- admin menu form for editing molds (meshes and all associated information for when to load/unload them) -->
		<div id="wtw_adminmenu11b" class="wtw-smallprint" style="display:none;visibility:hidden;">
			<div id="wtw_objectdiv">
				<h2 style="margin-bottom:3px;">3D Object</h2>
				<div class="wtw-onecol">3D Object File</div>
				<input type="text" id="wtw_tmoldobjectfile" maxlength="255" class="wtw-smallprintinput" />
				<br />
				<div class="wtw-rightbutton" onclick="WTW.openFullPageForm('medialibrary','object','3dobject');">Select 3D Object</div>
				<br />
			</div>
			<h2 id="wtw_moldpositiontitle" style="margin-bottom:3px;">Mold Position</h2>
			<div class="wtw-onecol" style="white-space:nowrap;">Position Z (left,-right)<br /> 
				<input type="text" id="wtw_tmoldpositionz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
				<input type="button" id="wtw_beditmoldzp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldpositionz', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldzp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldpositionz', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldzp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldpositionz', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldzp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldpositionz', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</div><br />
			<div class="wtw-onecol">Position X (front,-back)<br />
				<input type="text" id="wtw_tmoldpositionx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
				<input type="button" id="wtw_beditmoldxp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldpositionx', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldxp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldpositionx', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldxp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldpositionx', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldxp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldpositionx', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			</div><br />
			<div class="wtw-onecol">Position Y (up,-down)<br />
				<input type="text" id="wtw_tmoldpositiony" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
				<input type="button" id="wtw_beditmoldyp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldpositiony', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldyp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldpositiony', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldyp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldpositiony', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldyp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldpositiony', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			</div><br />
			<h2 id="wtw_moldscalingtitle" style="margin-bottom:3px;">Mold Size</h2>
			<div class="wtw-onecol">Length Z (left,-right)<br />
				<input type="text" id="wtw_tmoldscalingz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
				<input type="button" id="wtw_beditmoldzl4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingz', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldzl3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingz', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldzl2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingz', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldzl1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingz', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			</div><br />
			<div class="wtw-onecol">Length X (front,-back)<br />
				<input type="text" id="wtw_tmoldscalingx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
				<input type="button" id="wtw_beditmoldxl4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingx', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldxl3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingx', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldxl2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingx', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldxl1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingx', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			</div><br />
			<div id="wtw_moldscalingydiv" style="display:inline-block;">
				<div class="wtw-onecol">Length Y (up,-down)<br />
					<input type="text" id="wtw_tmoldscalingy" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
					<input type="button" id="wtw_beditmoldyl4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingy', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldyl3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingy', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldyl2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingy', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldyl1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldscalingy', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				</div><br />
			</div>
			<div id="wtw_terrainheightdiv">
				<div class="wtw-onecol">Terrain Height<br />
					<input type="text" id="wtw_tmoldmaxheight" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
					<input type="button" id="wtw_bterrainheight4" class="wtw-smallprint" value="-10" onmousedown="WTW.changeNumberValue('wtw_tmoldmaxheight', -10);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_bterrainheight3" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldmaxheight', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_bterrainheight2" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldmaxheight', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_bterrainheight1" class="wtw-smallprint" value="+10" onmousedown="WTW.changeNumberValue('wtw_tmoldmaxheight', 10);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				</div><br />
			</div>
			<div id="wtw_moldspecial1">
				<div class="wtw-onecol"><span id="wtw_moldspecial1title">Special 1</span><br />
					<input type="text" id="wtw_tmoldspecial1" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
					<input type="button" id="wtw_beditspecial14" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldspecial1', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditspecial13" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldspecial1', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditspecial12" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldspecial1', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditspecial11" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldspecial1', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				</div><br /><br />
			</div>
			<div id="wtw_moldspecial2">
				<div class="wtw-onecol"><span id="wtw_moldspecial2title">Special 2</span><br />
					<input type="text" id="wtw_tmoldspecial2" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
					<input type="button" id="wtw_beditspecial24" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldspecial2', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditspecial23" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldspecial2', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditspecial22" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldspecial2', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditspecial21" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldspecial2', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				</div><br /><br />
			</div>
			<h2 id="wtw_moldrotationtitle" style="margin-bottom:3px;">Mold Rotation</h2>
			<div class="wtw-onecol">Rotate Z (left,-right Axis)<br />
				<input type="text" id="wtw_tmoldrotationz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
				<input type="button" id="wtw_beditmoldzr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationz', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldzr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationz', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldzr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationz', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldzr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationz', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			</div><br />
			<div class="wtw-onecol">Rotate X (front,-back Axis)<br />
				<input type="text" id="wtw_tmoldrotationx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
				<input type="button" id="wtw_beditmoldxr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationx', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldxr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationx', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldxr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationx', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldxr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationx', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			</div><br />
			<div class="wtw-onecol">Rotate Y (up,-down Axis)<br />
				<input type="text" id="wtw_tmoldrotationy" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
				<input type="button" id="wtw_beditmoldyr4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationy', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldyr3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationy', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldyr2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationy', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				<input type="button" id="wtw_beditmoldyr1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldrotationy', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
			</div><hr class="wtw-menuhr" />
<?php		global $wtwadminmenu;
			echo $wtwadminmenu->getAdminMenuDivs('editmold'); ?>
			<div id="wtw_moldwebtextdiv">
				<h2 style="margin-bottom:3px;">3D Text</h2>
				<br />
				<h4 style="margin-bottom:3px;">3D Text Lettering</h4>
				<input type="text" id="wtw_tmoldwebtext" class="wtw-smallprintinput" style="width:90%;max-width:240px;" onblur="WTW.setNewMold();" />
				<br />
				<br />
			</div>
			<div id="wtw_moldwebtextcolordiv">
				<h4 style="margin-bottom:3px;">Alignment</h4>
				<select id="wtw_tmoldwebtextalign" onchange="WTW.setNewMold();">
					<option value="center">Center</option>
					<option value="left">Left</option>
					<option value="right">Right</option>
				</select><br />
				<div class="wtw-onecol">Letter Height<br />
					<input type="text" id="wtw_tmoldwebtextheight" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
					<input type="button" id="wtw_beditmoldlh4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldwebtextheight', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldlh3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldwebtextheight', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldlh2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldwebtextheight', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldlh1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldwebtextheight', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				</div><br />
				<div class="wtw-onecol">Letter Thickness<br />
					<input type="text" id="wtw_tmoldwebtextthick" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
					<input type="button" id="wtw_beditmoldlt4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldwebtextthick', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldlt3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldwebtextthick', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldlt2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldwebtextthick', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldlt1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldwebtextthick', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
				</div><br /><br />
				<h4 style="margin-bottom:3px;">Letter Color (emissive)</h4>
				<div class="wtw-mainmenuvalue">(Example: #ff0000)</div><br />
				<input type="text" id="wtw_tmoldwebtextcolor" maxlength="7" class="wtw-smallprintinput"  onfocus="WTW.openColorSelector(this, 'Emissive Color (Projected)', 'emissive');" onblur="WTW.closeColorSelector(false);WTW.setNewMold(1);" onchange="WTW.setColorDirect(this);WTW.setNewMold(1);" onkeyup="WTW.setColorDirect(this);WTW.setNewMold(1);" />
				<br /><br />
				<h4 style="margin-bottom:3px;">Base Color (diffuse)</h4>
				<div class="wtw-mainmenuvalue">(Example: #f0f0f0)</div><br />
				<input type="text" id="wtw_tmoldwebtextdiffuse" maxlength="7" class="wtw-smallprintinput" onfocus="WTW.openColorSelector(this, 'Diffuse Color (Base)', 'diffuse');" onblur="WTW.closeColorSelector(false);WTW.setNewMold(1);" onchange="WTW.setColorDirect(this);WTW.setNewMold(1);" onkeyup="WTW.setColorDirect(this);WTW.setNewMold(1);" />
				<br /><br />
				<h4 style="margin-bottom:3px;">Highlight Color (specular)</h4>
				<div class="wtw-mainmenuvalue">(Example: #000000)</div><br />
				<input type="text" id="wtw_tmoldwebtextspecular" maxlength="7" class="wtw-smallprintinput" onfocus="WTW.openColorSelector(this, 'Specular Color (Highlight)', 'specular');" onblur="WTW.closeColorSelector(false);WTW.setNewMold(1);" onchange="WTW.setColorDirect(this);WTW.setNewMold(1);" onkeyup="WTW.setColorDirect(this);WTW.setNewMold(1);" />
				<br /><br />
				<h4 style="margin-bottom:3px;">Environment Color (ambient)</h4>
				<div class="wtw-mainmenuvalue">(Example: #808080)</div><br />
				<input type="text" id="wtw_tmoldwebtextambient" maxlength="7" class="wtw-smallprintinput" onfocus="WTW.openColorSelector(this, 'Ambient Color (Environment)', 'ambient');" onblur="WTW.closeColorSelector(false);WTW.setNewMold(1);" onchange="WTW.setColorDirect(this);WTW.setNewMold(1);" onkeyup="WTW.setColorDirect(this);WTW.setNewMold(1);" />
				<br /><br />
				<hr class="wtw-menuhr" />
			</div>
			<div id="wtw_moldaddimagediv">
				<h2 style="margin-bottom:3px;">Image</h2>
				<img id="wtw_moldaddimagepreview" class="wtw-previewimage" /><br />
				<div class="wtw-menulevel0" onclick="WTW.openFullPageForm('medialibrary','image','webimage','wtw_tmoldaddimageid','wtw_tmoldaddimagepath','wtw_moldaddimagepreview');">Change Image</div>
				<br />
				<br />
				<h4 style="margin-bottom:3px;">Hover Image</h4>
				<img id="wtw_moldaddimagehoverpreview" class="wtw-previewimage" /><br />
				<div class="wtw-menulevel0" onclick="WTW.openFullPageForm('medialibrary','image','webimagehover','wtw_tmoldaddimagehoverid','wtw_tmoldaddimagehoverpath','wtw_moldaddimagehoverpreview');">Change Hover Image</div>
				<br />
				<br />
				<h2 style="margin-bottom:3px;">Add Click Event</h2>
				<div style="font-weight:normal;font-size:.8em;color:#c0c0c0;white-space:normal;">(optional)</div><br />
				<select id="wtw_tmoldaddonclick" onchange="WTW.changeOnClickEvent(this);">
					<option value="">None</option>
					<option value="WTW.openIFrame">Open IFrame</option>
					<option value="WTW.openWebpage">Open Webpage</option>
					<option value="javascript">Execute JavaScript</option>
				</select><br />
				<div id="wtw_onclickjavascriptdiv">
					<br />
					<br />
					<h4 style="margin-bottom:3px;">OnClick JavaScript</h4>
					<div style="font-weight:normal;font-size:.8em;color:#c0c0c0;white-space:normal;">(optional)</div><br />
					<input type="text" id="wtw_tmoldimagejsfunction" maxlength="255" style="width:300px;" class="wtw-smallprintinput" /><br />
					<br />
					<br />
					<h4 id="wtw_moldjsparameterstitle" style="margin-bottom:3px;">JavaScript Parameters</h4>
					<div id="wtw_moldjsparametersnote" style="font-weight:normal;font-size:.8em;color:#c0c0c0;white-space:normal;">(optional; comma separated)</div><br />
					<input type="text" id="wtw_tmoldimagejsparameters" maxlength="255" style="width:300px;" class="wtw-smallprintinput" /><br /><br />
				</div>
				<hr class="wtw-menuhr" />
			</div>
			<div id="wtw_moldaddvideodiv">
				<h2 style="margin-bottom:3px;">Video Settings</h2>
				<h4 style="margin-bottom:3px;">Video File (max 100MB)</h4>
				<img id="wtw_moldaddvideopreview" class="wtw-previewimage" width="190" src="/content/system/images/videoicon.png" /><br />
				<div class="wtw-menulevel0" onclick="WTW.openFullPageForm('medialibrary','video','webvideo','wtw_tmoldvideoid','wtw_tmoldvideopath','wtw_moldaddvideopreview');">Change Video</div>
				<br />
				<br />
				<h4 style="margin-bottom:3px;">Video Poster Image</h4>
				<img id="wtw_moldaddvideoposterpreview" class='wtw-previewimage' src="/content/system/images/videoposter.jpg" /><br />
				<div id="wtw_changevideoposter" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Poster</div>
				<div id="wtw_removevideoposter" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Remove Poster</div>
				<br />
				<br />
				<input type="checkbox" id="wtw_tmoldvideoloop" class="wtw-smallprint" value="1" onchange="dGet('wtw_tmoldsoundloop').checked=dGet('wtw_tmoldvideoloop').checked;WTW.setNewMold(1);" /><span style="color:#c0c0c0;"> Loop Video (repeat)</span><br /><br />
				<div class="wtw-onecol">Max Sound Distance Linear (100-Default)<br />
					<input type="text" id="wtw_tmoldvideomaxdistance" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);dGet('wtw_tmoldsoundmaxdistance').value=dGet('wtw_tmoldvideomaxdistance').value;WTW.setNewMold(1);" />
					<input type="button" id="wtw_beditmoldsvideodist4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldvideomaxdistance', -1, 1);" onmouseup="WTW.changeStop();dGet('wtw_tmoldsoundmaxdistance').value=dGet('wtw_tmoldvideomaxdistance').value;WTW.setNewMold(1);" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldsvideodist3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldvideomaxdistance', -.01, 1);" onmouseup="WTW.changeStop();dGet('wtw_tmoldsoundmaxdistance').value=dGet('wtw_tmoldvideomaxdistance').value;WTW.setNewMold(1);" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldsvideodist2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldvideomaxdistance', .01, 1);" onmouseup="WTW.changeStop();dGet('wtw_tmoldsoundmaxdistance').value=dGet('wtw_tmoldvideomaxdistance').value;WTW.setNewMold(1);" style="cursor: pointer;" />
					<input type="button" id="wtw_beditmoldsvideodist1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldvideomaxdistance', 1, 1);" onmouseup="WTW.changeStop();dGet('wtw_tmoldsoundmaxdistance').value=dGet('wtw_tmoldvideomaxdistance').value;WTW.setNewMold(1);" style="cursor: pointer;" />
				</div><br />
			</div>
			<div id="wtw_moldbasictexturesetdiv">
				<a href="https://www.walktheweb.com/wiki/coverings-or-textures/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
				<h2 style="margin-bottom:3px;">Covering Type</h2>
				<select id="wtw_tmoldcovering" onchange="WTW.changeCoveringType();">
				</select>
			</div>
			<div id="wtw_moldcolorsdiv">
				<h4 style="margin-bottom:3px;">Mold Emissive Color (Projected)</h4>
				<div class="wtw-mainmenuvalue">(Example: #000000)</div><br />
				<input type="text" id="wtw_tmoldemissivecolor" maxlength="7" class="wtw-smallprintinput" onfocus="WTW.openColorSelector(this, 'Emissive Color (Projected)', 'emissive');" onblur="WTW.closeColorSelector(false);WTW.setNewMold();" onchange="WTW.setColorDirect(this);" onkeyup="WTW.setColorDirect(this);" />
				<br />
				<h4 style="margin-bottom:3px;">Mold Diffuse Color (Base)</h4>
				<div class="wtw-mainmenuvalue">(Example: #ffffff)</div><br />
				<input type="text" id="wtw_tmolddiffusecolor" maxlength="7" class="wtw-smallprintinput" onfocus="WTW.openColorSelector(this, 'Diffuse Color (Base)', 'diffuse');" onblur="WTW.closeColorSelector(false);WTW.setNewMold();" onchange="WTW.setColorDirect(this);" onkeyup="WTW.setColorDirect(this);" />
				<br />
				<h4 style="margin-bottom:3px;">Mold Specular Color (Highlight)</h4>
				<div class="wtw-mainmenuvalue">(Example: #686868)</div><br />
				<input type="text" id="wtw_tmoldspecularcolor" maxlength="7" class="wtw-smallprintinput" onfocus="WTW.openColorSelector(this, 'Specular Color (Highlight)', 'specular');" onblur="WTW.closeColorSelector(false);WTW.setNewMold();" onchange="WTW.setColorDirect(this);" onkeyup="WTW.setColorDirect(this);" />
				<br />
				<h4 style="margin-bottom:3px;">Mold Ambient Color (Environment)</h4>
				<div class="wtw-mainmenuvalue">(Example: #575757)</div><br />
				<input type="text" id="wtw_tmoldambientcolor" maxlength="7" class="wtw-smallprintinput" onfocus="WTW.openColorSelector(this, 'Ambient Color (Environment)', 'ambient');" onblur="WTW.closeColorSelector(false);WTW.setNewMold();" onchange="WTW.setColorDirect(this);" onkeyup="WTW.setColorDirect(this);" />
				<br />
				<hr class="wtw-menuhr" />
			</div>
			<div id="wtw_moldbasictextureset2div">
				<h4 id="wtw_moldtexturetitle" style="margin-bottom:3px;">Mold Texture Image</h4>
				<img id="wtw_moldtexturepreview" class='wtw-previewimage' src="" /><br />
				<div id="wtw_moldchangetexture" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Texture</div>
				<br />
				<br />
			</div>
			<div id="wtw_moldbumptextureset2div">
				<h4 id="wtw_moldbumptexturetitle" style="margin-bottom:3px;">Mold Bump Image</h4>
				<img id="wtw_moldtexturebumppreview" class='wtw-previewimage' src="" /><br />
				<div id="wtw_moldchangebumptexture" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Bump Texture</div>
				<div class="wtw-menulevel0" onclick="dGet('wtw_tmoldtexturebumpid').value='';dGet('wtw_tmoldtexturebumppath').value='';WTW.setNewMold(1);dGet('wtw_moldtexturebumppreview').src='';">Clear Bump Texture</div>
				<br />
				<br />
			</div>
			<div id="wtw_moldheightmapdiv">
				<h2 style="margin-bottom:3px;">Terrain Heightmap Image</h2>
				<img id="wtw_moldheightmappreview" class='wtw-previewimage' src="" /><br />
				<div id="wtw_moldchangeheightmap" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Heightmap</div>
				<br />
				<br />
				<div id="wtw_moldtextureadvancedoptslink" onclick="WTW.toggleAdvanced(this, 'wtw_moldtextureadvancedopts');" class="wtw-showhideadvanced">-- Show Advanced Mixmap Terrain --</div>
				<div id="wtw_moldtextureadvancedopts" style="display:none;visibility:hidden;">
					<br /><br />
					<hr class="wtw-menuhr" />
					<div class="wtw-mainmenuvalue"><strong>Advanced Mixmap Terrain</strong> only applies after all required images are set.</div><br /><br />
					<h4 style="margin-bottom:3px;">Terrain Mixmap Image</h4>
					<div class="wtw-mainmenuvalue">Intensity of each texture according the channels red, green, and blue. (required)</div><br />
					<img id="wtw_moldmixmappreview" class='wtw-previewimage' src="" /><br />
					<div id="wtw_changemixmap" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Mixmap</div>
					<br />
					<br />
					<h4 style="margin-bottom:3px;">Red Texture Image</h4>
					<div class="wtw-mainmenuvalue">Texture that will apply to the Red channel of the Mixmap. (required)</div><br />
					<img id="wtw_moldtexturerpreview" class='wtw-previewimage' src="" /><br />
					<div id="wtw_changeredtexture" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Red Texture</div>
					<br />
					<br />
					<h4 style="margin-bottom:3px;">Green Texture Image</h4>
					<div class="wtw-mainmenuvalue">Texture that will apply to the Green channel of the Mixmap. (required)</div><br />
					<img id="wtw_moldtexturegpreview" class='wtw-previewimage' src="" /><br />
					<div id="wtw_changegreentexture" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Green Texture</div>
					<br />
					<br />
					<h4 style="margin-bottom:3px;">Blue Texture Image</h4>
					<div class="wtw-mainmenuvalue">Texture that will apply to the Blue channel of the Mixmap. (required)</div><br />
					<img id="wtw_moldtexturebpreview" class='wtw-previewimage' src="" /><br />
					<div id="wtw_changebluetexture" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Blue Texture</div>
					<br />
					<br />
					<h4 style="margin-bottom:3px;">Red Texture Bump Image</h4>
					<div class="wtw-mainmenuvalue">Bump map texture that will apply to the Red texture. (optional)</div><br />
					<img id="wtw_moldtexturebumprpreview" class='wtw-previewimage' src="" /><br />
					<div id="wtw_changeredbumptexture" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Red Bump Map</div>
					<br />
					<br />
					<h4 style="margin-bottom:3px;">Green Texture Bump Image</h4>
					<div class="wtw-mainmenuvalue">Bump map texture that will apply to the Green texture. (optional)</div><br />
					<img id="wtw_moldtexturebumpgpreview" class='wtw-previewimage' src="" /><br />
					<div id="wtw_changegreenbumptexture" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Green Bump Map</div>
					<br />
					<br />
					<h4 style="margin-bottom:3px;">Blue Texture Bump Image</h4>
					<div class="wtw-mainmenuvalue">Bump map texture that will apply to the Blue texture. (optional)</div><br />
					<img id="wtw_moldtexturebumpbpreview" class='wtw-previewimage' src="" /><br />
					<div id="wtw_changebluebumptexture" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Change Blue Bump Map</div>
					<br />
					<br />
					<hr class="wtw-menuhr" />
					<br />
				</div><br /><br />
			</div>
			<div id="wtw_pointlistdiv" style="text-align:left;">
				<div id="wtw_pointeditdiv" style="background: rgba(256,200,200,0.6);border:2px solid red;">
					<div style="float:right;cursor:pointer;font-size:.8em;" onclick="WTW.editEndPoint();">close [x]</div>
					<h2 style="margin-bottom:3px;">Point Position</h2>
					<div class="wtw-onecol" style="white-space:nowrap;">Position Z (left,-right)<br /> 
						<input type="text" id="wtw_tpointpositionz" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
						<input type="button" id="wtw_beditpointzp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tpointpositionz', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditpointzp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tpointpositionz', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditpointzp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tpointpositionz', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditpointzp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tpointpositionz', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</div><br />
					<div class="wtw-onecol">Position X (front,-back)<br />
						<input type="text" id="wtw_tpointpositionx" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
						<input type="button" id="wtw_beditpointxp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tpointpositionx', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditpointxp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tpointpositionx', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditpointxp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tpointpositionx', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditpointxp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tpointpositionx', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					</div><br />
					<div class="wtw-onecol">Position Y (up,-down)<br />
						<input type="text" id="wtw_tpointpositiony" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold();" />
						<input type="button" id="wtw_beditpointyp4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tpointpositiony', -1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditpointyp3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tpointpositiony', -.01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditpointyp2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tpointpositiony', .01);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						<input type="button" id="wtw_beditpointyp1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tpointpositiony', 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					</div><br />
					<div class="wtw-menulevel00 wtw-center" onmousedown="WTW.deletePoint();WTW.editEndPoint();" >Delete Point</div>
					<div class="wtw-menulevel00 wtw-center" onmousedown="WTW.editEndPoint();" >Close</div>
				</div>
				<div id="wtw_pointlist1"></div><br />
				<div id="wtw_pointlist2"></div><br />
			</div>
			<div id="wtw_moldadvancedoptslink" onclick="WTW.toggleAdvanced(this, 'wtw_moldadvancedopts');" class="wtw-showhideadvanced">-- Show Advanced Options --</div>
			<div id="wtw_moldadvancedopts" style="display:none;visibility:hidden;">
				<br /><br />
				<div id="wtw_visibilitydistancediv">
					<h2 style="margin-bottom:3px;">Shape Visibility Distance</h2>
					<select id="wtw_tmoldloadactionzoneid"></select>
				</div>
				<div id="wtw_moldtexturesetdiv"><br /><br />
					<input type="checkbox" id="wtw_tmoldgraphiclevel" class="wtw-smallprint" value="1" onchange="WTW.setNewMold(1);" /><span style="color:#c0c0c0;"> Force Original Graphic</span><br /><br />
					<input type="checkbox" id="wtw_tmoldreceiveshadows" class="wtw-smallprint" value="1" onchange="WTW.setNewMold(1);" /><span style="color:#c0c0c0;"> Allow Shadows on Surface</span><br /><br />
					<input type="checkbox" id="wtw_tmoldwaterreflection" class="wtw-smallprint" value="1" onchange="WTW.setNewMold(1);" /><span style="color:#c0c0c0;"> Select to Reflect on Water</span><br /><br />
					<div id="wtw_alttagdiv">
						<hr class="wtw-menuhr" />
						<h2 style="margin-bottom:3px;">Alt Tag for 3D Mold</h2>
						<input type="text" id="wtw_tmoldalttag" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
						<br />
					</div>
					<div id="wtw_moldscalediv">
						<h2 style="margin-bottom:3px;">Mold Texture Adjustment</h2>
						<div class="wtw-onecol">Scale Width (0 for auto)<br />
							<input type="text" id="wtw_tmolduscale" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold(1);" />
							<input type="button" id="wtw_beditmoldus4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmolduscale', -1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldus3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmolduscale', -.01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldus2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmolduscale', .01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldus1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmolduscale', 1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						</div><br />
						<div class="wtw-onecol">Scale Height (0 for auto)<br />
							<input type="text" id="wtw_tmoldvscale" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold(1);" />
							<input type="button" id="wtw_beditmoldvs4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldvscale', -1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldvs3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldvscale', -.01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldvs2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldvscale', .01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldvs1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldvscale', 1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						</div><br />
						<div class="wtw-onecol">Width Offset<br />
							<input type="text" id="wtw_tmolduoffset" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold(1);" />
							<input type="button" id="wtw_beditmolduo4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmolduoffset', -1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmolduo3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmolduoffset', -.01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmolduo2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmolduoffset', .01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmolduo1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmolduoffset', 1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						</div><br />
						<div class="wtw-onecol">Height Offset<br />
							<input type="text" id="wtw_tmoldvoffset" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold(1);" />
							<input type="button" id="wtw_beditmoldvo4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldvoffset', -1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldvo3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldvoffset', -.01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldvo2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldvoffset', .01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldvo1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldvoffset', 1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						</div><br />
						<div class="wtw-onecol">Opacity (0-transparent, 100-solid)<br />
							<input type="text" id="wtw_tmoldopacity" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold(1);" />
							<input type="button" id="wtw_beditmoldop4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldopacity', -1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldop3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldopacity', -.01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldop2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldopacity', .01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldop1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldopacity', 1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						</div><br />
					</div>
					<hr class="wtw-menuhr" />
				</div><br />
				<div id="wtw_moldsubdivisions">
					<div class="wtw-onecol">Subdivisions<br />
						<input type="text" id="wtw_tmoldsubdivisions" maxlength="16" class="wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold(1);" />
						<input type="button" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldsubdivisions', -1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						<input type="button" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldsubdivisions', 1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
					</div><br />
					<hr class="wtw-menuhr" />
				</div>
				<div id="wtw_moldsounddiv">
					<h2 style="margin-bottom:3px;">Attach Sound</h2>
					<h4>Attentuation Distance Model</h4>
					<select id="wtw_tmoldsoundattenuation" onchange="WTW.setSoundFields();">
						<option value="none">No Sound</option>
						<option value="linear">Linear</option>
						<option value="exponential">Exponential</option>
						<option value="inverse">Inverse</option>
					</select><br /><br />
					<div id="wtw_moldsoundoffdiv">
						<input type="checkbox" id="wtw_tmoldsoundloop" class="wtw-smallprint" value="1" onchange="" /><span style="color:#c0c0c0;"> Loop sound (repeat)</span><br /><br />
						<div id="wtw_moldsoundmaxdistdiv" class="wtw-onecol">Max Distance Linear (Default: 100)<br />
							<input type="text" id="wtw_tmoldsoundmaxdistance" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold(1);" />
							<input type="button" id="wtw_beditmoldsdist4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundmaxdistance', -1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldsdist3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundmaxdistance', -.01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldsdist2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundmaxdistance', .01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldsdist1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundmaxdistance', 1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						</div><br />
						<div id="wtw_moldsoundrolloffdiv" class="wtw-onecol">Roll Off Factor (Default: 1)<br />
							<input type="text" id="wtw_tmoldsoundrollofffactor" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold(1);" />
							<input type="button" id="wtw_beditmoldsroll4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundrollofffactor', -1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldsroll3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundrollofffactor', -.01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldsroll2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundrollofffactor', .01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldsroll1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundrollofffactor', 1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						</div><br />
						<div id="wtw_moldsoundrefdistdiv" class="wtw-onecol">Reference Distance (Default: 1)<br />
							<input type="text" id="wtw_tmoldsoundrefdistance" maxlength="16" class="wtw-secondcolcontent wtw-smallprintinput" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setNewMold(1);" />
							<input type="button" id="wtw_beditmoldsrdist4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundrefdistance', -1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldsrdist3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundrefdistance', -.01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldsrdist2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundrefdistance', .01, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
							<input type="button" id="wtw_beditmoldsrdist1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tmoldsoundrefdistance', 1, 1);" onmouseup="WTW.changeStop();" style="cursor: pointer;" />
						</div>
						<img id="wtw_soundicon" src="/content/system/images/3dsound.png" class="wtw-adminiconimage" /> &nbsp;
						<div id="wtw_selectedsound"></div>
					</div>
					<div id="wtw_selectsound" class="wtw-menulevel0" onclick="WTW.adminMenuItemSelected(this);">Select Sound</div>
					<br />
					<hr class="wtw-menuhr" />
				</div>
				<div id="wtw_moldmergemoldsdiv">
					<a href="https://www.walktheweb.com/wiki/cutting-out-3d-shapes/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<h2 style="margin-bottom:3px;">Merge Shapes</h2>
					<select id="wtw_tmoldcsgaction" onchange="WTW.checkMoldTextureCSG();WTW.setNewMold(1);">
						<option value="">None</option>
						<option value="subtract">Subtract from another Shape</option>
						<option value="intersect">Intersect with another Shape</option>
						<option value="union">Combine with another Shape</option>
					</select>
					<br />
					<br />
					<div id="wtw_selectedcsgshape"></div>
					<div id="wtw_bselectcsgshape" class="wtw-menulevel0" onclick="WTW.selectMergePart(WTW.pick);">Pick Shape to Merge</div>
					<br />
					<hr class="wtw-menuhr" />
				</div>
			</div>
			<br />
			<br />
	</div>
