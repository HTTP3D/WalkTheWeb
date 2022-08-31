/* All code is Copyright 2013-2022 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* google analytics support for 3D Browsing of 3D Communities, 3D Buildings, and 3D Things at multiple load zone levels */

WTWJS.prototype.checkAnalytics = function(zactionzoneind) {
	/* see if there is an analytics id set for a given web object */
	try {
		if (WTW.actionZones[zactionzoneind] != null) {
			var zmoldname = WTW.actionZones[zactionzoneind].moldname;
			var zactionzonename = WTW.actionZones[zactionzoneind].actionzonename;
			var zcommunityid = WTW.actionZones[zactionzoneind].communityinfo.communityid;
			var zbuildingid = WTW.actionZones[zactionzoneind].buildinginfo.buildingid;
			var zthingid = WTW.actionZones[zactionzoneind].thinginfo.thingid;
			if (zmoldname.indexOf('loadzone') > -1 && zmoldname.indexOf('unloadzone') == -1 && WTW.actionZones[zactionzoneind].status == 0 && WTW.actionZones[zactionzoneind].actionzonename.toLowerCase().indexOf('custom') == -1 && (zcommunityid != '' || zbuildingid != '' || zthingid != '')) {
				if (zactionzonename == 'Extreme Load Zone') {
					WTW.trackPageView(zactionzoneind, 'extreme');
				} else if (zactionzonename == 'High - Load when far') {
					WTW.trackPageView(zactionzoneind, 'high');
				} else if (zactionzonename == 'Normal - Load when near') {
					WTW.trackPageView(zactionzoneind, 'near');
				}
				/* alternative is to add to que then process */
				/* WTW.queueAnalytics(zactionzoneind, 'extreme'); */
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_analytics.js-checkAnalytics=' + ex.message);
	}
}

WTWJS.prototype.queueAnalytics = function(zactionzoneind, zdistancename) {
	/* queue a pageview to be sent to analytics */
	try {
		var zanalyticsqueueind = WTW.getNextCount(WTW.analyticsQueue);
		WTW.analyticsQueue[zanalyticsqueueind] = WTW.newAnalyticsQueue();
		WTW.analyticsQueue[zanalyticsqueueind].actionzoneind = zactionzoneind;
		WTW.analyticsQueue[zanalyticsqueueind].distancename = zdistancename;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_analytics.js-queueAnalytics=' + ex.message);
	}
}

WTWJS.prototype.checkAnalyticsQueue = function() {
	/* check the analytics queue for a page view to be processed */
	try {
		if (WTW.analyticsQueue != null) {
			if (WTW.analyticsQueue.length > 0) {
				if (WTW.analyticsQueue[0] != null) {
					WTW.trackPageView(WTW.analyticsQueue[0].actionzoneind, WTW.analyticsQueue[0].distancename);
					WTW.analyticsQueue.splice(0, 1);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_analytics.js-checkAnalyticsQueue=' + ex.message);
	}
}

WTWJS.prototype.trackPageView = async function(zactionzoneind, zdistancename) {
	/* process the page view to analytics */
	try {
		var zcommunityid = WTW.actionZones[Number(zactionzoneind)].communityinfo.communityid;
		var zbuildingid = WTW.actionZones[Number(zactionzoneind)].buildinginfo.buildingid;
		var zthingid = WTW.actionZones[Number(zactionzoneind)].thinginfo.thingid;
		var zanalyticsid = '';
		var zitem = '';
		if (zcommunityid != '') {
			zanalyticsid = WTW.actionZones[Number(zactionzoneind)].communityinfo.analyticsid;
			zitem = 'community';
		}
		if (zbuildingid != '') {
			zanalyticsid = WTW.actionZones[Number(zactionzoneind)].buildinginfo.analyticsid;
			zitem = 'building';
		}
		if (zthingid != '') {
			zanalyticsid = WTW.actionZones[Number(zactionzoneind)].thinginfo.analyticsid;
			zitem = 'thing';
		}
		if (zanalyticsid != '' && zanalyticsid != undefined) {
			var zsrc = '';
			switch (zitem) {
				case 'community':
					if (zdistancename == 'extreme') {
						zsrc = '/core/handlers/community-loaded-extreme.php?analyticsid=' + zanalyticsid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid;
					} else if (zdistancename == 'high') {
						zsrc = '/core/handlers/community-loaded-high.php?analyticsid=' + zanalyticsid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid;
					} else {
						zsrc = '/core/handlers/community-loaded-near.php?analyticsid=' + zanalyticsid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid;
					}
					break;
				case 'building':
					if (zdistancename == 'extreme') {
						zsrc = '/core/handlers/building-loaded-extreme.php?analyticsid=' + zanalyticsid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid;
					} else if (zdistancename == 'high') {
						zsrc = '/core/handlers/building-loaded-high.php?analyticsid=' + zanalyticsid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid;
					} else {
						zsrc = '/core/handlers/building-loaded-near.php?analyticsid=' + zanalyticsid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid;
					}
					break;
				case 'thing':
					if (zdistancename == 'extreme') {
						zsrc = '/core/handlers/thing-loaded-extreme.php?analyticsid=' + zanalyticsid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid;
					} else if (zdistancename == 'high') {
						zsrc = '/core/handlers/thing-loaded-high.php?analyticsid=' + zanalyticsid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid;
					} else {
						zsrc = '/core/handlers/thing-loaded-near.php?analyticsid=' + zanalyticsid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid;
					}
					break;
			} 
			if (zsrc != '') {
				WTW.getAsycnWebpage(zsrc, null);
			}
		} 
		
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_analytics.js-trackPageView=' + ex.message);
	}
}

