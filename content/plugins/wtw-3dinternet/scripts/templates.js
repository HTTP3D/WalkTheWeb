/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_3DINTERNET.prototype.saveShareCommunityForm = async function() {
	/* process the share 3D Community and Save the settings locally for next Share */
	try {
		dGet('wtw_tsharecommunityversion').disabled = false;
		dGet('wtw_tsharecommunityversiondesc').disabled = false;
		var zrequest = {
			'communityid': communityid,
			'communityname': btoa(dGet('wtw_tsharecommunitytempname').value),
			'description': btoa(dGet('wtw_tsharecommunitydescription').value),
			'tags': btoa(dGet('wtw_tsharecommunitytags').value),
			'version' : dGet('wtw_tsharecommunityversion').value,
			'versiondesc' : btoa(dGet('wtw_tsharecommunityversiondesc').value),
			'function':'savecommunitytemplate'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-templates.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				dGet('wtw_sharehash').value = zresponse.sharehash;
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-templates.js-saveShareCommunityForm=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.shareCommunityTemplate = async function() {
	/* after user is sent to confirm form to make sure they want to Share the 3D Community */
	/* this process the share */
	try {
		dGet('wtw_bsharecommunitytemp').innerHTML = 'Shared 3D Community';
		var zrequest = {
			'communityid': communityid,
			'sharehash': dGet('wtw_sharehash').value,
			'function':'sharecommunitytemplate'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-templates.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);

				/* note serror would contain errors */
				dGet('wtw_sharecommunityresponse').innerHTML = zresponse.success + ' ' + zresponse.serror;
				window.setTimeout(function() {
					dGet('wtw_sharecommunityresponse').innerHTML = '';
				}, 5000);
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-templates.js-shareCommunityTemplate=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.saveShareBuildingForm = async function() {
	/* process the share 3D Building and Save the settings locally for next Share */
	try {
		dGet('wtw_tsharebuildingversion').disabled = false;
		dGet('wtw_tsharebuildingversiondesc').disabled = false;
		var zrequest = {
			'buildingid': buildingid,
			'buildingname': btoa(dGet('wtw_tsharebuildingtempname').value),
			'description': btoa(dGet('wtw_tsharebuildingdescription').value),
			'tags': btoa(dGet('wtw_tsharebuildingtags').value),
			'version' : dGet('wtw_tsharebuildingversion').value,
			'versiondesc' : btoa(dGet('wtw_tsharebuildingversiondesc').value),
			'function':'savebuildingtemplate'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-templates.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				dGet('wtw_sharehash').value = zresponse.sharehash;
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-templates.js-saveShareBuildingForm=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.shareBuildingTemplate = async function() {
	/* after user is sent to confirm form to make sure they want to Share the 3D Building */
	/* this process the share */
	try {
		dGet('wtw_bsharebuildingtemp').innerHTML = 'Shared 3D Building';
		var zrequest = {
			'buildingid': buildingid,
			'sharehash': dGet('wtw_sharehash').value,
			'function':'sharebuildingtemplate'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-templates.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);

				/* note serror would contain errors */
				dGet('wtw_sharebuildingresponse').innerHTML = zresponse.success + ' ' + zresponse.serror;
				window.setTimeout(function() {
					dGet('wtw_sharebuildingresponse').innerHTML = '';
				}, 5000);
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-templates.js-shareBuildingTemplate=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.saveShareThingForm = async function() {
	/* process the share 3D Thing and Save the settings locally for next Share */
	try {
		dGet('wtw_tsharethingversion').disabled = false;
		dGet('wtw_tsharethingversiondesc').disabled = false;
		var zrequest = {
			'thingid': thingid,
			'pastthingid': '',
			'thingname': btoa(dGet('wtw_tsharethingtempname').value),
			'description': btoa(dGet('wtw_tsharethingdescription').value),
			'tags': btoa(dGet('wtw_tsharethingtags').value),
			'version' : dGet('wtw_tsharethingversion').value,
			'versiondesc' : btoa(dGet('wtw_tsharethingversiondesc').value),
			'function':'savethingtemplate'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-templates.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				dGet('wtw_sharehash').value = zresponse.sharehash;
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-templates.js-saveShareThingForm=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.shareThingTemplate = async function() {
	/* after user is sent to confirm form to make sure they want to Share the 3D Thing */
	/* this will process the share */
	try {
		dGet('wtw_bsharethingtemplate').value = 'Shared 3D Thing';
		var zrequest = {
			'thingid': thingid,
			'sharehash': dGet('wtw_sharehash').value,
			'function':'sharethingtemplate'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-templates.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);

				/* note serror would contain errors */
				dGet('wtw_sharethingresponse').innerHTML = zresponse.success + ' ' + zresponse.serror;
				window.setTimeout(function() {
					dGet('wtw_sharethingresponse').innerHTML = '';
				}, 5000);
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-templates.js-shareThingTemplate=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.saveShareAvatarForm = async function() {
	/* process the share 3D Avatar and Save the settings locally for next Share */
	try {
		dGet('wtw_tshareversion').disabled = false;
		dGet('wtw_tshareversiondesc').disabled = false;
		var zrequest = {
			'avatarid': avatarid,
			'pastavatarid': '',
			'templatename': btoa(dGet('wtw_tshareavatartempname').value),
			'description': btoa(dGet('wtw_tshareavatardescription').value),
			'tags': btoa(dGet('wtw_tshareavatartags').value),
			'version' : dGet('wtw_tshareversion').value,
			'versiondesc' : btoa(dGet('wtw_tshareversiondesc').value),
			'function':'saveavatartemplate'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-templates.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				dGet('wtw_sharehash').value = zresponse.sharehash;
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-templates.js-saveShareAvatarForm=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.shareAvatarTemplate = function() {
	/* after user is sent to confirm form to make sure they want to Share the 3D Avatar */
	/* this will process the share */
	try {
		var zrequest = {
			'avatarid': avatarid,
			'sharehash': dGet('wtw_sharehash').value,
			'function':'shareavatartemplate'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-templates.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);

				/* note serror would contain errors */
				dGet('wtw_shareavatarresponse').innerHTML = zresponse.success + ' ' + zresponse.serror;
				window.setTimeout(function() {
					dGet('wtw_shareavatarresponse').innerHTML = '';
				}, 5000);
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-templates.js-shareAvatarTemplate=' + ex.message);
	} 
}

