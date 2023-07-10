/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* avatar functions are used to control various animations or interactions betwen avatars and molds */

WTWJS.prototype.moveAvatar = async function(zavatar, zkeyspressed) {
	/* provides animation and movement to avatar based on keys pressed (keyboard, mouse, and touch) */
	try {
		if (zavatar == undefined) {
			zavatar = WTW.myAvatar;
		}
		if (zkeyspressed == undefined) {
			zkeyspressed = WTW.keysPressed;
		}
		if (WTW.animationSet == undefined || WTW.animationSet == null) {
			WTW.animationSet = '';
		}
		if (zavatar != null && WTW.cameraFocus == 1 && WTW.placeHolder == 0) {
			zavatar.rotation.x = 0;
			zavatar.rotation.z = 0;
			var zincrement = .5;
			var zactivecount = 0;
			var zmoveevents = [];
			var zonjump = false;
			var zonwalk = false;
			var zonwalkbackwards = false;
			var zonrun = false;
			var zonrunbackwards = false;
			var zonturnright = false;
			var zonrunturnright = false;
			var zonturnleft = false;
			var zonrunturnleft = false;
			var zonstraferight = false;
			var zonrunstraferight = false;
			var zonstrafeleft = false;
			var zonrunstrafeleft = false;
			if (zavatar.WTW != null) {
				if (zavatar.WTW.animations != null) {
					if (zavatar.WTW.animations.running != null) {
						var zrunninganims = zavatar.WTW.animations.running;
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onjump', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onjump', WTW.animationSet)].active == 1) {
								zonjump = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)].active == 1) {
								zonwalk = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet)].active == 1) {
								zonwalkbackwards = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)].active == 1) {
								zonrun = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet)].active == 1) {
								zonrunbackwards = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet)].active == 1) {
								zonturnright = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet)].active == 1) {
								zonrunturnright = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].active == 1) {
								zonturnleft = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet)].active == 1) {
								zonrunturnleft = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onstraferight', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onstraferight', WTW.animationSet)].active == 1) {
								zonstraferight = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet)].active == 1) {
								zonrunstraferight = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onstrafeleft', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onstrafeleft', WTW.animationSet)].active == 1) {
								zonstrafeleft = true;
							}
						}
						if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet)] != undefined) {
							if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet)].active == 1) {
								zonrunstrafeleft = true;
							}
						}
						WTW.resetActiveAnimations(zavatar);
						if (zkeyspressed != null) {
							for (var k=0;k < zkeyspressed.length;k++) {
								if (zkeyspressed[k] != null) {
									let zanim = '';
									if (WTW.isNumeric(zkeyspressed[k])) {
										switch (zkeyspressed[k]) {
											case 32: //space jump
												if (zonwalk) {
													zanim = WTW.checkAnimationSet(zavatar, 'onjumpwalk', WTW.animationSet);
													if (zrunninganims[zanim] != undefined) {
														zrunninganims[zanim].active = 1;
														if (zrunninganims[zanim].starttime == null) {
															zrunninganims[zanim].starttime = new Date();
															zrunninganims[zanim].endtime = null;
														}
													}
													zanim = '';
													zactivecount += 1;
												} else if (zonwalkbackwards) {
													zanim = WTW.checkAnimationSet(zavatar, 'onjumpwalkbackwards', WTW.animationSet);
													if (zrunninganims[zanim] != undefined) {
														zrunninganims[zanim].active = 1;
														if (zrunninganims[zanim].starttime == null) {
															zrunninganims[zanim].starttime = new Date();
															zrunninganims[zanim].endtime = null;
														}
													}
													zanim = '';
													zactivecount += 1;
												} else if (zonrun) {
													zanim = WTW.checkAnimationSet(zavatar, 'onjumprun', WTW.animationSet);
													if (zrunninganims[zanim] != undefined) {
														zrunninganims[zanim].active = 1;
														if (zrunninganims[zanim].starttime == null) {
															zrunninganims[zanim].starttime = new Date();
															zrunninganims[zanim].endtime = null;
														}
													}
													zanim = '';
													zactivecount += 1;
												} else if (zonrunbackwards) {
													zanim = WTW.checkAnimationSet(zavatar, 'onjumprunbackwards', WTW.animationSet);
													if (zrunninganims[zanim] != undefined) {
														zrunninganims[zanim].active = 1;
														if (zrunninganims[zanim].starttime == null) {
															zrunninganims[zanim].starttime = new Date();
															zrunninganims[zanim].endtime = null;
														}
													}
													zanim = '';
													zactivecount += 1;
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onjump', WTW.animationSet);
												}
												break;
											case 38: //arrow w forward
											case 87: //w forward
												/* check if backwards is also pressed */
												if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onjump', WTW.animationSet)] != undefined) {
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onjump', WTW.animationSet)].active == 1) {
														zonjump = true;
													}
												}

												if (zonjump) {
													if (zonwalkbackwards || zonrunbackwards) {
														zanim = WTW.checkAnimationSet(zavatar, 'onjump', WTW.animationSet);
													} else if (WTW.shiftKey) {
														zanim = WTW.checkAnimationSet(zavatar, 'onjumprun', WTW.animationSet);
													} else {
														zanim = WTW.checkAnimationSet(zavatar, 'onjumpwalk', WTW.animationSet);
													}
													if (zrunninganims[zanim] != undefined) {
														zrunninganims[zanim].active = 1;
														if (zrunninganims[zanim].starttime == null) {
															zrunninganims[zanim].starttime = new Date();
															zrunninganims[zanim].endtime = null;
														}
													}
													zanim = '';
													zactivecount += 1;
												} else {
													if (zonwalkbackwards || zonrunbackwards) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet)].active = 0;
														if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet)].endtime == null) {
															zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet)].starttime = null;
															zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet)].endtime = new Date();
														}
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet)].active = 0;
														if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet)].endtime == null) {
															zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet)].starttime = null;
															zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet)].endtime = new Date();
														}
													} else {
														if (WTW.shiftKey) {
															zanim = WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet);
														} else {
															zanim = WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet);
														}
													}
												}
												break;
											case 1038: //arrow w forward
												/* check if backwards is also pressed */
												if (zonwalkbackwards) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet)].endtime = new Date();
													}
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet);
												}
												break;
											case 2038: //arrow w forward
												/* check if backwards is also pressed */
												if (zonrunbackwards) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet)].endtime = new Date();
													}
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet);
												}
												break;
											case 40: //arrow s backwards
											case 83: //s backwards
												/* check if backwards is also pressed */
												if (zonjump) {
													if (zonwalk || zonrun) {
														zanim = WTW.checkAnimationSet(zavatar, 'onjump', WTW.animationSet);
													} else if (WTW.shiftKey) {
														zanim = WTW.checkAnimationSet(zavatar, 'onjumprunbackwards', WTW.animationSet);
													} else {
														zanim = WTW.checkAnimationSet(zavatar, 'onjumpwalkbackwards', WTW.animationSet);
													}
													if (zrunninganims[zanim] != undefined) {
														zrunninganims[zanim].active = 1;
														if (zrunninganims[zanim].starttime == null) {
															zrunninganims[zanim].starttime = new Date();
															zrunninganims[zanim].endtime = null;
														}
													}
													zanim = '';
													zactivecount += 1;
												} else {
													if (zonwalk || zonrun) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)].active = 0;
														if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)].endtime == null) {
															zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)].starttime = null;
															zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)].endtime = new Date();
														}
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)].active = 0;
														if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)].endtime == null) {
															zrunninganims[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)].starttime = null;
															zrunninganims[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)].endtime = new Date();
														}
													} else {
														if (WTW.shiftKey) {
															zanim = WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet);
														} else {
															zanim = WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet);
														}
													}
												}
												break;
											case 1040: //arrow s backwards
												if (zonwalk) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)].endtime = new Date();
													}
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet);
												}
												break;
											case 2040: //arrow s backwards
												if (zonrun) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)].endtime = new Date();
													}
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet);
												}
												break;
											case 37: //arrow q rotate left
											case 81: //q rotate left
												/* check if right is also pressed */
												if (zonturnright || zonrunturnright) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet)].endtime = new Date();
													}
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet)].endtime = new Date();
													}
												} else {
													if (WTW.shiftKey) {
														zanim = WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet);
													} else {
														zanim = WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet);
													}
												}
												break;
											case 1037: //mouse rotate left
												/* check if right is also pressed */
												if (zonturnright) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet)].endtime = new Date();
													}
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet);
												}
												break;
											case 2037: //mouse rotate left
												/* check if right is also pressed */
												if (zonrunturnright) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet)].endtime = new Date();
													}
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet);
												}
												break;
											case 39: //arrow e rotate right
											case 69: //e rotate right
												/* check if left is also pressed */
												if (zonturnleft || zonrunturnleft) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].endtime = new Date();
													}
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet)].endtime = new Date();
													}
												} else {
													if (WTW.shiftKey) {
														zanim = WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet);
													} else {
														zanim = WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet);
													}
												}
												break;
											case 1039: //mouse rotate right
												/* check if left is also pressed */
												if (zonturnleft || zonrunturnleft) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].endtime = new Date();
													}
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet)].endtime = new Date();
													}
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet);
												}
												break;
											case 2039: //mouse rotate right
												/* check if left is also pressed */
												if (zonturnleft) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet)].edntime = new Date();
													}
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet);
												}
												break;
											case 65: //a strafe left
											case 1065: //mouse strafe left
												/* check if right is also pressed */
												if (zonstraferight || zonrunstraferight) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onstraferight', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onstraferight', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onstraferight', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onstraferight', WTW.animationSet)].endtime = new Date();
													}
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet)].endtime = new Date();
													}
												} else {
													if (WTW.shiftKey) {
														zanim = WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet);
													} else {
														zanim = WTW.checkAnimationSet(zavatar, 'onstrafeleft', WTW.animationSet);
													}
												}
												break;
											case 2065: //mouse strafe left
												/* check if right is also pressed */
												if (zonrunstraferight) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet)].endtime = new Date();
													}
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet);
												}
												break;
											case 68: //d strafe right
											case 1068: //mouse strafe right
												/* check if left is also pressed */
												if (zonstrafeleft || zonrunstrafeleft) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onstrafeleft', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onstrafeleft', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onstrafeleft', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onstrafeleft', WTW.animationSet)].endtime = new Date();
													}
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet)].endtime = new Date();
													}
												} else {
													if (WTW.shiftKey) {
														zanim = WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet);
													} else {
														zanim = WTW.checkAnimationSet(zavatar, 'onstraferight', WTW.animationSet);
													}
												}
												break;
											case 2068: //mouse strafe right
												/* check if left is also pressed */
												if (zonrunstrafeleft) {
													zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet)].active = 0;
													if (zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet)].endtime == null) {
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet)].starttime = null;
														zrunninganims[WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet)].endtime = new Date();
													}
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet);
												}
												break;
											case 82: //r rotate up
											case 1082: //mouse rotate up
											case 2082: //mouse fast rotate up
												zanim = WTW.checkAnimationSet(zavatar, 'onrotateup', WTW.animationSet);
												break;
											case 70: //f rotate down
											case 1070: //mouse rotate down
											case 2070: //mouse fast rotate down
												zanim = WTW.checkAnimationSet(zavatar, 'onrotatedown', WTW.animationSet);
												break;
											case 0: //pause animation
												zanim = WTW.checkAnimationSet(zavatar, 'onpause', WTW.animationSet);
												break;
										} 
										if (zanim != '') {
											if (zrunninganims[zanim] != undefined) {
												zrunninganims[zanim].active = 1;
												if (zrunninganims[zanim].starttime == null) {
													zrunninganims[zanim].starttime = new Date();
													zrunninganims[zanim].endtime = null;
												}
											}
											zanim = '';
											zactivecount += 1;
										}
									} else {
										zanim = WTW.checkAnimationSet(zavatar, zkeyspressed[k], WTW.animationSet);
										if (zrunninganims[zanim] != undefined) {
											zrunninganims[zanim].active = 1;
											if (zrunninganims[zanim].starttime == null) {
												zrunninganims[zanim].starttime = new Date();
												zrunninganims[zanim].endtime = null;
											}
										}
										zactivecount += 1;
									}
								}
							}
						}
						if (WTW.animationSet == 'vehicle-boat') {
							WTW.moveAvatarVehicle(zavatar, zkeyspressed);
						} else {
							let zanimset = WTW.checkAnimationSet(zavatar, 'onwait', WTW.animationSet);
							if (zkeyspressed.length == 0) {
								if (zrunninganims[zanimset] != undefined) {
									zrunninganims[zanimset].active = 1;
									if (zrunninganims[zanimset].starttime == null) {
										zrunninganims[zanimset].starttime = new Date();
										zrunninganims[zanimset].endtime = null;
									}
								}
								zactivecount += 1;
							}
							if (zactivecount == 0) {
								zactivecount = 1;
							}
							if (WTW.fps < 5) {
								WTW.fps = 5;
							}
							/* set the weight for each animation running */
							var zweight = 0;
							if (zrunninganims['onjumpwalk'] != undefined) {
								if (zrunninganims['onjumpwalk'].active == 1) {
									zrunninganims['onjumpwalk'].weight = 1;
									/* clear other weights */
									zrunninganims[zanimset].weight = 0;
								}
							}
							if (zrunninganims['onjumpwalkbackwards'] != undefined) {
								if (zrunninganims['onjumpwalkbackwards'].active == 1) {
									zrunninganims['onjumpwalkbackwards'].weight = 1;
									/* clear other weights */
									zrunninganims[zanimset].weight = 0;
								}
							}
							if (zrunninganims['onjumprun'] != undefined) {
								if (zrunninganims['onjumprun'].active == 1) {
									zrunninganims['onjumprun'].weight = 1;
									/* clear other weights */
									zrunninganims[zanimset].weight = 0;
								}
							}
							if (zrunninganims['onjumprunbackwards'] != undefined) {
								if (zrunninganims['onjumprunbackwards'].active == 1) {
									zrunninganims['onjumprunbackwards'].weight = 1;
									/* clear other weights */
									zrunninganims[zanimset].weight = 0;
								}
							}
							for(var zevent in zrunninganims) {
								var zrunningevent = zrunninganims[zevent];
								var zstarttime = zrunningevent.starttime;
								var zendtime = zrunningevent.endtime;
								var znowtime = new Date();
								var zruntime = 0;
								var zmaxweight = 1/zactivecount;
								if (zstarttime != null && zendtime == null) {
									zruntime = (znowtime - zstarttime);
								}
								if (zevent == 'onwalk' || zevent == 'onrun' || zevent.indexOf('onjump') > -1) {
									zmaxweight = 1;
								} else if (zonwalk) {
									if (zruntime > 2) {
										/* the longer you hold the item, the faster it responds - like a turn */
										zmaxweight = .5;
									} else {
										zmaxweight = .2;
									}
								} else if (zonrun) {
									if (zruntime > 2) {
										/* the longer you hold the item, the faster it responds - like a turn */
										zmaxweight = .6;
									} else {
										zmaxweight = .1;
									}
								} else if (zonjump) {
									zmaxweight = 0;
								}
								if (zrunningevent != undefined) {
									if (zrunningevent.active == 0) {
										
										if (zrunningevent.weight > zincrement) {
											if (zevent != 'onwait') {
												zrunningevent.weight -= zincrement;
											}
										} else {
											zrunningevent.weight = 0;
										}
									} else {
										if (zrunningevent.weight < zmaxweight) {
											if (zrunningevent.weight + zincrement > zmaxweight) {
												zrunningevent.weight = zmaxweight;
											} else {
												zrunningevent.weight += zincrement;
											}
										} else {
											if (zrunningevent.weight - zincrement < zmaxweight) {
												zrunningevent.weight = zmaxweight;
											} else {
												zrunningevent.weight -= zincrement;
											}
										}
									}
									zmoveevents[zmoveevents.length] = {
										'event':zevent,
										'weight':zrunningevent.weight,
										'active':zrunningevent.active,
										'start':zstarttime,
										'end':zrunningevent.endtime
									}
									zweight += zrunningevent.weight;

									if (zrunningevent.weight > 0) {
										/* check for jump animation */
										var zavatarscale = WTW.getMeshOrNodeByID(zavatar.name + '-scale');
										var zavatarcenter = WTW.getMeshOrNodeByID(zavatar.name + '-center');
										var zavatarcamera = WTW.getMeshOrNodeByID(zavatar.name + '-camera');
										if (zavatarscale != null && zavatarcenter != null && zavatarcamera != null) {
											if (zevent.indexOf('jump') > -1) {
												/* this next code raises the avatar base and adjusts the avatar scaling, camera, and center mass during a jump animation */
												if (zavatarscale.position.y == 0) {
													zavatar.position.y += 2;
													zavatarscale.position.y -= 2;
													zavatarcenter.position.y -= 2;
													zavatarcamera.position.y -= 2;
												}
											} else if (zavatarscale.position.y != 0) {
													/* return from avatar jump base movement */
													zavatar.position.y -= 2;
													zavatarscale.position.y = 0;
													zavatarcenter.position.y += 2;
													zavatarcamera.position.y += 2;
											}
										}
										
										/* sets movement based on event, weight, move settings, and framerate */
										switch (zevent) {
											case 'onjump':
												break;
											case 'onwait':
												var zstride = WTW.init.gravity * 15 * zrunningevent.weight / WTW.fps;
												var zmove = WTW.getMoveDownVector(zavatar.name, -zstride);
												var zavatary = zavatar.position.y;
												zavatar.moveWithCollisions(zmove);
												if (zavatary != zavatar.position.y) {
													WTW.checkZones = true;
												}
												break;
											case 'onrotateup':
												if (WTW.isMouseDown == 1) {
													WTW.swipeRotateAvatar(zavatar);
												} else {
													WTW.cameraYOffset -= 400/WTW.sizeY * WTW.turnSpeed * zrunningevent.weight;
												}
												zweight -= zrunningevent.weight;
												break;
											case 'onrotatedown':
												if (WTW.isMouseDown == 1) {
													WTW.swipeRotateAvatar(zavatar);
												} else {
													WTW.cameraYOffset += 400/WTW.sizeY * WTW.turnSpeed * zrunningevent.weight;
												}
												zweight -= zrunningevent.weight;
												break;
											case 'onwalk':
												var zstride = 15 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, 0, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onjumpwalk':	
												var zstride = 15 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, 0, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onjumpwalkbackwards':	
												var zstride = 15 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, 180, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onrun':
												var zstride = 25 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, 0, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onjumprun':
												var zstride = 25 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, 0, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onjumprunbackwards':
												var zstride = 25 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, 180, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onwalkbackwards':
												var zstride = 10 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, 180, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onrunbackwards':
												var zstride = 25 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, 180, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onturnleft':
												if (WTW.isMouseDown == 1) {
													WTW.swipeRotateAvatar(zavatar);
												} else {
													zavatar.rotation.y -= WTW.getRadians(70 * zrunningevent.weight * WTW.turnSpeed / WTW.fps);
												}
												zrunningevent.speedRatio = WTW.turnAnimationSpeed;
												var zstride = WTW.init.gravity * 15 * zrunningevent.weight / WTW.fps;
												var zmove = WTW.getMoveDownVector(zavatar.name, -zstride);
												var zavatary = zavatar.position.y;
												zavatar.moveWithCollisions(zmove);
												if (zavatary != zavatar.position.y) {
													WTW.checkZones = true;
												}
												break;
											case 'onrunturnleft':
												if (WTW.isMouseDown == 1) {
													WTW.swipeRotateAvatar(zavatar);
												} else {
													zavatar.rotation.y -= WTW.getRadians(120 * zrunningevent.weight * WTW.turnSpeed / WTW.fps);
												}
												zrunningevent.speedRatio = WTW.turnAnimationSpeed * 1.5;
												var zstride = WTW.init.gravity * 15 * zrunningevent.weight / WTW.fps;
												var zmove = WTW.getMoveDownVector(zavatar.name, -zstride);
												var zavatary = zavatar.position.y;
												zavatar.moveWithCollisions(zmove);
												if (zavatary != zavatar.position.y) {
													WTW.checkZones = true;
												}
												break;
											case 'onturnright':
												if (WTW.isMouseDown == 1) {
													WTW.swipeRotateAvatar(zavatar);
												} else {
													zavatar.rotation.y += WTW.getRadians(70 * zrunningevent.weight * WTW.turnSpeed / WTW.fps);
												}
												zrunningevent.speedRatio = WTW.turnAnimationSpeed;
												var zstride = WTW.init.gravity * 15 * zrunningevent.weight / WTW.fps;
												var zmove = WTW.getMoveDownVector(zavatar.name, -zstride);
												var zavatary = zavatar.position.y;
												zavatar.moveWithCollisions(zmove);
												if (zavatary != zavatar.position.y) {
													WTW.checkZones = true;
												}
												break;
											case 'onrunturnright':
												if (WTW.isMouseDown == 1) {
													WTW.swipeRotateAvatar(zavatar);
												} else {
													zavatar.rotation.y += WTW.getRadians(120 * zavatar.WTW.animations.	running[zevent].weight * WTW.turnSpeed / WTW.fps);
												}
												zrunningevent.speedRatio = WTW.turnAnimationSpeed * 1.5;
												var zstride = WTW.init.gravity * 15 * zrunningevent.weight / WTW.fps;
												var zmove = WTW.getMoveDownVector(zavatar.name, -zstride);
												var zavatary = zavatar.position.y;
												zavatar.moveWithCollisions(zmove);
												if (zavatary != zavatar.position.y) {
													WTW.checkZones = true;
												}
												break;
											case 'onstrafeleft':
												var zstride = 4 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, -90, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onrunstrafeleft':
												var zstride = 8 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, -90, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onstraferight':
												var zstride = 4 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, 90, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											case 'onrunstraferight':
												var zstride = 8 * zrunningevent.weight * WTW.walkSpeed / WTW.fps;
												zrunningevent.speedRatio = WTW.walkAnimationSpeed;
												var zmove = WTW.getMoveVector(zavatar.name, 90, zstride, zevent);
												zavatar.moveWithCollisions(zmove);
												WTW.checkZones = true;
												break;
											default:
												zweight = WTW.pluginsSetAvatarMovement(zavatar, zevent, zweight);
												break;
										}
										/* limits the camera rotation for up and down */
										if (WTW.cameraYOffset < -10) {
											WTW.cameraYOffset = -10;
										}
										if (WTW.cameraYOffset > 10) {
											WTW.cameraYOffset = 10;
										}
										/* sets the camera to properly follow and rotate from the avatar position */
										WTW.setMovingCameras(zavatar);
									}
								}
							}
							if (zrunninganims[zanimset] != undefined) {
								if (zanimset != 'onwait') {
									zrunninganims['onwait'].weight = 0;
								}
								/* if the animation settings do not equal 1, add or remove onwait for the difference */
								if (zweight < 1) {
									zrunninganims[zanimset].weight += 1 - zweight;
								} else {
									zrunninganims[zanimset].weight -= zweight - 1;
								}
								zmoveevents = WTW.setMovementEventsKey(zmoveevents, zanimset, zrunninganims[zanimset].weight);
							}
						}
					}
				}
			}
			WTW.pluginsMoveAvatar(zavatar, zmoveevents);
		} else {
			if (zavatar != null && WTW.cameraFocus == 1) {
				if (zkeyspressed != null) {
					for (var k=0;k < zkeyspressed.length;k++) {
						if (zkeyspressed[k] != null) {
							switch (zkeyspressed[k]) {
								case 37: //arrow q rotate left
								case 81: //q rotate left
								case 1037: //mouse rotate left
								case 2037: //mouse rotate left
								case 65: //a strafe left
								case 1065: //mouse strafe left
								case 2065: //mouse strafe left
									if (WTW.isMouseDown == 1) {
										WTW.swipeRotateAvatar(zavatar);
									} else {
										zavatar.rotation.y -= WTW.getRadians(70 * WTW.turnSpeed / WTW.fps);
									}
									break;
								case 39: //arrow e rotate right
								case 69: //e rotate right
								case 1039: //mouse rotate right
								case 2039: //mouse rotate right
								case 68: //d strafe right
								case 1068: //mouse strafe right
								case 2068: //mouse strafe right
									if (WTW.isMouseDown == 1) {
										WTW.swipeRotateAvatar(zavatar);
									} else {
										zavatar.rotation.y += WTW.getRadians(70 * WTW.turnSpeed / WTW.fps);
									}
									break;
								case 1082: //mouse rotate up
								case 2082: //mouse fast rotate up
									if (WTW.mouseY == WTW.mouseStartY) {
										WTW.cameraYOffset -= 400/WTW.sizeY * WTW.turnSpeed;
									} else if (WTW.isMouseDown == 1) {
										WTW.cameraYOffset += 100/WTW.sizeY * (WTW.mouseY - WTW.mouseStartY) * WTW.turnSpeed;
										WTW.mouseStartY = WTW.mouseY;
									}
									break;
								case 1070: //mouse rotate down
								case 2070: //mouse fast rotate down
									if (WTW.mouseY == WTW.mouseStartY) {
										WTW.cameraYOffset += 400/WTW.sizeY * WTW.turnSpeed;
									} else if (WTW.isMouseDown == 1) {
										WTW.cameraYOffset -= 100/WTW.sizeY * (WTW.mouseStartY - WTW.mouseY) * WTW.turnSpeed;
										WTW.mouseStartY = WTW.mouseY;
									}
									break;
							}
						}
					}
				}
			}
			WTW.setMovingCameras(zavatar);
		}
	} catch(ex) {
		WTW.log('core-scripts-avatars-wtw_avatarfunctions.js-moveAvatar=' + ex.message);
	}
}

WTWJS.prototype.swipeRotateAvatar = function(zavatar) {
	/* swipe rotation avatar */
	try {
		/* process horizonal movement */
		if (WTW.swipeDirection.x > 0) {
			if (WTW.mouseX - WTW.mouseStartX < WTW.sizeX / 4) {
				/* turn right */
				zavatar.rotation.y += WTW.getRadians(20 * WTW.turnSpeed / WTW.fps);
			} else {
				/* runturn right */
				zavatar.rotation.y += WTW.getRadians(60 * WTW.turnSpeed / WTW.fps);
			}
		} else if (WTW.swipeDirection.x < 0) {
			if (WTW.mouseStartX - WTW.mouseX < WTW.sizeX / 4) {
				/* turn left */
				zavatar.rotation.y -= WTW.getRadians(20 * WTW.turnSpeed / WTW.fps);
			} else {
				/* runturn left */
				zavatar.rotation.y -= WTW.getRadians(60 * WTW.turnSpeed / WTW.fps);
			}
		}
		/* process vertical movement */
		if (WTW.swipeDirection.y > 0) {
			if (WTW.mouseY - WTW.mouseStartY < WTW.sizeY / 4) {
				/* turn up */
				WTW.cameraYOffset += .1;
			} else {
				/* runturn up */
				WTW.cameraYOffset += .75;
			}
		} else if (WTW.swipeDirection.y < 0) {
			if (WTW.mouseStartY - WTW.mouseY < WTW.sizeY / 4) {
				/* turn left */
				WTW.cameraYOffset -= .1;
			} else {
				/* runturn left */
				WTW.cameraYOffset -= .75;
			}
		}
	} catch(ex) {
		WTW.log('core-scripts-avatars-wtw_avatarfunctions.js-swipeRotateAvatar=' + ex.message);
	}
}

WTWJS.prototype.deleteUserAvatar = function(zglobaluseravatarid, zuseravatarid, zwidth, zheight) {
	/* flags a useravatar as deleted - does not actually delete the files or table records */
	try {
		if (zuseravatarid != '') {
			var zrequest = {
				'useravatarid':zuseravatarid,
				'function':'deleteuseravatar'
			};
			/* send request to local server avatars handler */
			WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					WTW.pluginsDeleteUserAvatar(zglobaluseravatarid, zuseravatarid, zwidth, zheight);
					if (zglobaluseravatarid == '') {
						/* only had local user avatar - refresh list */
						WTW.hudLoginLoadAvatars();
					}
				}
			);
		} else {
			WTW.pluginsDeleteUserAvatar(zglobaluseravatarid, zuseravatarid, zwidth, zheight);
		}
	} catch(ex) {
		WTW.log('core-scripts-avatars-wtw_avatarfunctions.js-deleteUserAvatar=' + ex.message);
	}
}

WTWJS.prototype.pickUpObject = function(zavatarname, zmoldname, zavatarjointname, zoffset) {
	/* pick up object to avatar */
	/* zavatarname = name of avatar to pick up object (my avatar is: 'myavatar' + dGet('wtw_tinstanceid').value ) */
	/* zmoldname = name of mold to pick up (can get from mouse click on item as picked name) */
	/* zavatarjointname = each avatar has embedded boxes for joints that can serve as a parent to an object */
	/* 		(zavatarjointname values are: 'headtop', 'chest', 'righthand', 'lefthand', 'righthip', 'lefthip', 'rightfoot', or 'leftfoot') */
	/* zoffset = offset values of position, rotation, and scaling used for parenting mold to zavatarjointname */
	try {
		if (zavatarjointname == undefined || zavatarjointname == '') {
			zavatarjointname = 'righthand';
		}
		if (zoffset == undefined) {
			/* rotation is degrees */
			zoffset = {
				'position': {
					'x':0,
					'y':0,
					'z':0
				},
				'scaling': {
					'x':1,
					'y':1,
					'z':1
				},
				'rotation': {
					'x':0,
					'y':0,
					'z':0
				}
			}
		}
		var zavatarjointmold = WTW.getMeshOrNodeByID(zavatarname + '-' + zavatarjointname);
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zavatarjointmold != null && zmold != null) {
			zmold.parent = zavatarjointmold;
			if (zoffset.position != undefined) {
				if (zoffset.position.x != undefined) {
					zmold.position.x = zoffset.position.x;
				}
				if (zoffset.position.y != undefined) {
					zmold.position.y = zoffset.position.y;
				}
				if (zoffset.position.z != undefined) {
					zmold.position.z = zoffset.position.z;
				}
			}
			if (zoffset.scaling != undefined) {
				if (zoffset.scaling.x != undefined) {
					zmold.scaling.x = zoffset.scaling.x;
				}
				if (zoffset.scaling.y != undefined) {
					zmold.scaling.y = zoffset.scaling.y;
				}
				if (zoffset.scaling.z != undefined) {
					zmold.scaling.z = zoffset.scaling.z;
				}
			}
			if (zoffset.rotation != undefined) {
				if (zoffset.rotation.x != undefined) {
					zmold.rotation.x = WTW.getRadians(zoffset.rotation.x);
				}
				if (zoffset.rotation.y != undefined) {
					zmold.rotation.y = WTW.getRadians(zoffset.rotation.y);
				}
				if (zoffset.rotation.z != undefined) {
					zmold.rotation.z = WTW.getRadians(zoffset.rotation.z);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-avatars-wtw_avatarfunctions.js-pickUpObject=' + ex.message);
	}
}

