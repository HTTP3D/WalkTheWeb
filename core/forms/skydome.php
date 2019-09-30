<div id="wtw_adminmenu40b" class="wtw-hide">
	<div id="wtw_skysetday" class="wtw-menulevel2" onclick="WTW.adminMenuItemSelected(this);">Set Day Scene</div>
	<div id="wtw_skysetsunrise" class="wtw-menulevel2" onclick="WTW.adminMenuItemSelected(this);">Set Sunrise Scene</div>
	<div id="wtw_skysetsunset" class="wtw-menulevel2" onclick="WTW.adminMenuItemSelected(this);">Set Sunset Scene</div>
	<div id="wtw_skysetnight" class="wtw-menulevel2" onclick="WTW.adminMenuItemSelected(this);">Set Night Scene</div>
	<br />	
	<hr class="wtw-menuhr" />
	<div id="wtw_skyadvancedoptslink" onclick="WTW.toggleAdvanced(this, 'wtw_skyadvancedopts');" class="wtw-showhideadvanced">-- Show Advanced Options --</div>
	<div id="wtw_skyadvancedopts" style="display:none;visibility:hidden;">
		<br />
		<h2>Solar Inclination</h2>
		<div class="wtw-mainmenuvalue">The sun position from Sunrise to Sunset.</div><br />
		<input type="button" value="&lt;-" style="display:inline-block;" onclick="WTW.setSkyScene('inclination', null, -.01);WTW.blockPassThrough();" />
		<input id="wtw_tskyinclination" type="range" min="0" max="1.2" defaultValue="0" step=".01" onchange="WTW.setSkyScene('inclination', this.value, 0);WTW.blockPassThrough();"/>
		<input type="button" value="-&gt;" style="display:inline-block;" onclick="WTW.setSkyScene('inclination', null, .01);WTW.blockPassThrough();" />
		<br />
		<div id="wtw_skyinclination" class="wtw-mainmenuvalue wtw-center"></div>
		<br />	
		<hr class="wtw-menuhr" />
		<h2>Sky Luminance</h2>
		<div class="wtw-mainmenuvalue">Controls the overall brightness of sky.</div><br />
		<input type="button" value="&lt;-" style="display:inline-block;" onclick="WTW.setSkyScene('luminance', null, .01);WTW.blockPassThrough();" />
		<input id="wtw_tskyluminance" type="range" min="0" max="1" defaultValue="1" step=".01" style="direction:rtl;" onchange="WTW.setSkyScene('luminance', this.value, 0);WTW.blockPassThrough();"/>
		<input type="button" value="-&gt;" style="display:inline-block;" onclick="WTW.setSkyScene('luminance', null, -.01);WTW.blockPassThrough();" />
		<br />
		<div id="wtw_skyluminance" class="wtw-mainmenuvalue wtw-center"></div>
		<br />	
		<hr class="wtw-menuhr" />
		<h2>Solar Azimuth</h2>
		<div class="wtw-mainmenuvalue">The horizontal angle of the sun position.</div><br />
		<input type="button" value="&lt;-" style="display:inline-block;" onclick="WTW.setSkyScene('azimuth', null, -.01);WTW.blockPassThrough();" />
		<input id="wtw_tskyazimuth" type="range" min="0" max=".5" defaultValue=".25" step=".01" onchange="WTW.setSkyScene('azimuth', this.value, 0);WTW.blockPassThrough();"/>
		<input type="button" value="-&gt;" style="display:inline-block;" onclick="WTW.setSkyScene('azimuth', null, .01);WTW.blockPassThrough();" />
		<br />
		<div id="wtw_skyazimuth" class="wtw-mainmenuvalue wtw-center"></div>
		<br />	
		<hr class="wtw-menuhr" />
		<h2>Sky Rayleigh</h2>
		<div class="wtw-mainmenuvalue">Represents the global sky appearance.</div><br />
		<input type="button" value="&lt;-" style="display:inline-block;" onclick="WTW.setSkyScene('rayleigh', null, -.01);WTW.blockPassThrough();" />
		<input id="wtw_tskyrayleigh" type="range" min="0" max="5" defaultValue="2.00" step=".01" onchange="WTW.setSkyScene('rayleigh', this.value, 0);WTW.blockPassThrough();"/>
		<input type="button" value="-&gt;" style="display:inline-block;" onclick="WTW.setSkyScene('rayleigh', null, .01);WTW.blockPassThrough();" />
		<br />
		<div id="wtw_skyrayleigh" class="wtw-mainmenuvalue wtw-center"></div>
		<br />	
		<hr class="wtw-menuhr" />
		<h2>Haze Turbidity</h2>
		<div class="wtw-mainmenuvalue">The amount of haze scattering in the atmosphere.</div><br />
		<input type="button" value="&lt;-" style="display:inline-block;" onclick="WTW.setSkyScene('turbidity', null, -1);WTW.blockPassThrough();" />
		<input id="wtw_tskyturbidity" type="range" min="0" max="50" defaultValue="10" step="1" onchange="WTW.setSkyScene('turbidity', this.value, 0);WTW.blockPassThrough();"/>
		<input type="button" value="-&gt;" style="display:inline-block;" onclick="WTW.setSkyScene('turbidity', null, 1);WTW.blockPassThrough();" />
		<br />
		<div id="wtw_skyturbidity" class="wtw-mainmenuvalue wtw-center"></div>
		<br />	
		<hr class="wtw-menuhr" />
		<h2>Haze Mie Scattering</h2>
		<div class="wtw-mainmenuvalue">The amount of haze particles in the atmosphere.</div><br />
		<input type="button" value="&lt;-" style="display:inline-block;" onclick="WTW.setSkyScene('miedirectionalg', null, -.01);WTW.blockPassThrough();" />
		<input id="wtw_tskymiedirectionalg" type="range" min=".20" max=".99" defaultValue=".80" step=".01" onchange="WTW.setSkyScene('miedirectionalg', this.value, 0);WTW.blockPassThrough();"/>
		<input type="button" value="-&gt;" style="display:inline-block;" onclick="WTW.setSkyScene('miedirectionalg', null, .01);WTW.blockPassThrough();" />
		<br />
		<div id="wtw_skymiedirectionalg" class="wtw-mainmenuvalue wtw-center"></div>
		<br />	
		<hr class="wtw-menuhr" />
		<h2>Haze Mie Coefficient</h2>
		<div class="wtw-mainmenuvalue">The haze particle size coefficient.</div><br />
		<input type="button" value="&lt;-" style="display:inline-block;" onclick="WTW.setSkyScene('miecoefficient', null, -.001);WTW.blockPassThrough();" />
		<input id="wtw_tskymiecoefficient" type="range" min=".001" max=".999" defaultValue=".008" step=".001" onchange="WTW.setSkyScene('miecoefficient', this.value, 0);WTW.blockPassThrough();"/>
		<input type="button" value="-&gt;" style="display:inline-block;" onclick="WTW.setSkyScene('miecoefficient', null, .001);WTW.blockPassThrough();" />
		<br />
		<div id="wtw_skymiecoefficient" class="wtw-mainmenuvalue wtw-center"></div>
		<br /><br />	
	</div>
</div>



