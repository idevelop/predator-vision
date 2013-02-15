/*
 * Predator Vision
 * http://idevelop.github.com/predator-vision/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

(function() {
	var heatmap;
	var decay = 220;

	camera.init({
		// downscale for performance reasons
		width: 320,
		height: 240,
		fps: 60,
		mirror: true,

		onFrame: function(canvas) {
			if (heatmap) {
				// get list of pixels which are different
				movement.fromCanvas(canvas, {
					callback: function(updateList) {
						for (var i = 0; i < updateList.length; i++) {
							heatmap.addPoint(updateList[i].x * 2, updateList[i].y * 2, 6, 10 / 255);
						}
					}
				});

	            heatmap.update();
	            heatmap.multiply(1 - decay / (100 * 100));
	            heatmap.display();
			}
		},

		onSuccess: function() {
			try {
				heatmap = createWebGLHeatmap({
					canvas: document.getElementById('heatmap')
				});
			} catch (exception) {
				// webgl not supported
				camera.stop();
				document.getElementById("webGLNotSupported").style.display = "block";
			}

			document.getElementById("info").style.display = "none";
		},

		onError: console.error,

		onNotSupported: function() {
			document.getElementById("info").style.display = "none";
			document.getElementById("cameraNotSupported").style.display = "block";
		}
	});
})();