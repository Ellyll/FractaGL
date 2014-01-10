FractaGL
========

A real time WebGL Mandelbrot generator.

FractaGL is a real time web based [Mandelbrot](http://en.wikipedia.org/wiki/Mandelbrot_set)
generator using WebGL. You can click to drag it around, use the mousewheel to
zoom in and out and even go full screen. On touch devices you can use your
finger to pan around and pinch to zoom in and out.

It should work in most modern browsers and in many modern phones, but so far I've
only tested it on Firefox 26 on Ubuntu 12.04LTS and on the latest (January
2014) Chrome and Firefox on a Nexus 4. I've also tested it on an old HTC
Desire Z, but it didn't work on that.

You can try it on: [http://code.madarch.org/fractagl](http://code.madarch.org/fractagl)

The WebGL fractal generation code comes from Erik Möller's WebGL 101
([YouTube](http://www.youtube.com/watch?v=me3BviH3nZc),
[GitHub](https://github.com/emoller/WebGL101) and
[license](LICENSE-WebGL101.txt)). Thanks!

The full screen code was written thanks to [Craig
Buckler](http://www.sitepoint.com/author/craig-buckler/)'s article [How to Use
the HTML5 Full-Screen API](http://www.sitepoint.com/html5-full-screen-api/).