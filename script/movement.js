// Author: Andrei Gheorghe (http://github.com/idevelop)

var movement = (function() {
	var previousImageData;

	function movementFromCanvas(canvas, options) {
		var context = canvas.getContext("2d");
		var canvasWidth = canvas.width;
		var canvasHeight = canvas.height;

		// get webcam image data
		var currentData = context.getImageData(0, 0, canvasWidth, canvasHeight);

		// create an image if the previous image doesn’t exist
		if (!previousImageData) {
			previousImageData = currentData;
			return; // nothing to blend yet
		}

		var result = []; // keeps the points which have changed, indicating movement

		for (var y = 0; y < canvasHeight; y++) {
			for (var x = 0; x < canvasWidth; x++) {
				var offset = (y * canvasWidth + x) * 4;

				var currentColor = getColorAtOffset(currentData.data, offset);
				var previousColor = getColorAtOffset(previousImageData.data, offset); 

				// blend the 2 images		
				var currentAverage = (currentColor.red + currentColor.blue + currentColor.green) / 3;
				var previousAverage = (previousColor.red + previousColor.blue + previousColor.green) / 3;

				var diff = fastAbs(currentAverage - previousAverage);
				if (diff > options.threshold) {
					result.push({
						x: x,
						y: y
					});
				}
			}
		}

		// store the current webcam image
		previousImageData = currentData;

		options.callback(result);
	}

	function getColorAtOffset(data, offset) {
		return {
			red: data[offset],
			green: data[offset + 1],
			blue: data[offset + 2],
			alpha: data[offset + 3]
		};
	}

	function fastAbs(value) {
		// funky bitwise, equal Math.abs
		return (value ^ (value >> 31)) - (value >> 31);
	}

	return {
		fromCanvas: function(canvas, options) {
			options = options || {};
			options.callback = options.callback || doNothing;
			options.threshold = options.threshold || 0x15; // 0 - 255

			return movementFromCanvas(canvas, options);
		}
	};
})();
