/*
 * Predator Vision
 * http://idevelop.github.com/predator-vision/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

(function() {
	var heatmap;
	var heatmapDecay = 250; // higher values => faster decay
	var heatmapPointSize = 6;
	var heatmapPointIntensity = 10 / 255;

	camera.init({
		// downscale video for performance reasons
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
							heatmap.addPoint(updateList[i].x * 2, updateList[i].y * 2, heatmapPointSize, heatmapPointIntensity);
						}
					}
				});

				// update, decay, etc
	            heatmap.update();
	            heatmap.multiply(1 - heatmapDecay / (100 * 100));
	            heatmap.display();
			}
		},

		onSuccess: function() {
			document.getElementById("info").style.display = "none";

			try {
				heatmap = createWebGLHeatmap({
					canvas: document.getElementById('heatmap')
				});
			} catch (exception) {
				// webgl not supported
				camera.stop();
				document.getElementById("webGLNotSupported").style.display = "block";
			}
		},

		onError: console.error,

		onNotSupported: function() {
			document.getElementById("info").style.display = "none";
			document.getElementById("cameraNotSupported").style.display = "block";
		}
	});
})();