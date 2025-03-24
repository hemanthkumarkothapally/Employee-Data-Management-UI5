/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/trail/ui5trail/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
