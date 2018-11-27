Predator Vision
===============

Predator Vision uses the HTML5 getUserMedia API and WebGL to transform a video stream from your webcam into a real-time movement-triggered heatmap representation. 

**[See it in action](https://idevelop.github.com/predator-vision/)**.

If your browser is not supported you can watch a [demo video](http://www.youtube.com/watch?v=a_4ZhcT9hSs).

<img src="https://idevelop.github.com/images/predator-screenshot.png" />

## Supported browsers

* Chrome &ge; 21
* Firefox &ge; 17 (requires `media.navigator.enabled = true` in `about:config`)
* Opera &ge; 12

## Libraries used

* Camera input is done using the [camera.js library](https://github.com/idevelop/camera.js).
* The heatmap is produced using the [WebGL heatmap library](https://github.com/pyalot/webgl-heatmap), created by [Florian Bösch](https://github.com/pyalot).
* The movement detection code is adapted and optimized from the [magic xylophone](http://www.adobe.com/devnet/html5/articles/javascript-motion-detection.html).

## Author

**Andrei Gheorghe**

* [About me](http://idevelop.github.com)
* LinkedIn: [linkedin.com/in/idevelop](http://www.linkedin.com/in/idevelop)
* Twitter: [@idevelop](http://twitter.com/idevelop)

## License

- This code is licensed under the MIT License.
- The [WebGL heatmap library](https://github.com/pyalot/webgl-heatmap/) is licensed under the MIT License.
