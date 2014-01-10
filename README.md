FractaGL
========

A real time WebGL Mandelbrot generator.

FractaGL is a real time web based [Mandelbrot](http://en.wikipedia.org/wiki/Mandelbrot_set)
generator using WebGL. You can click to drag it around, use the mousewheel to
zoom in and out and even go full screen. On touch devices you can use your
finger to pan around and pinch to zoom in and out. It should work on most modern browsers
and phones (see below).

You can try it on: [http://code.madarch.org/fractagl](http://code.madarch.org/fractagl)

The WebGL fractal generation code comes from Erik Möller's WebGL 101
([YouTube](http://www.youtube.com/watch?v=me3BviH3nZc),
[GitHub](https://github.com/emoller/WebGL101) and
[license](LICENSE-WebGL101.txt)). Thanks!

The full screen code was written thanks to [Craig
Buckler](http://www.sitepoint.com/author/craig-buckler/)'s article [How to Use
the HTML5 Full-Screen API](http://www.sitepoint.com/html5-full-screen-api/).

Browser Support
---------------

For some versions of Chrome and Chromium (particularly on Linux) you may have to enable
WebGL support. To do this you put chrome://flags in the URL bar and then enable
"Override software rendering list" (warning, this is experimental).

### Testing results ###

Works on:

*   Firefox 26 on Ubuntu 12.04 LTS
*   Chromium 31 (after enabling - see above) on Ubuntu 12.04 LTS
*   Iceweasel (aka Firefox) 17 on Debian 7.3 (wheezy)
*   Firefox 25 and Chromium 31 on Xubuntu 13.10
*   Firefox and Chrome on Windows 8
*   Firefox, Chrome and Opera on Nexus 5
*   Chrome on Nexus 4

Doesn't work on:

*   HTC Desire Z (partially works in Opera but too slow to be usable)
*   Chrome on Nexus 7 (renders correctly but doing anything crashes Chrome - problem with touch events maybe?)


TODO
----
* More testing
* Fix on Nexus 7
* Fix scaling so image doesn't get squashed depending on browser window size
* Improve pinch zoom, sometimes doesn't feel quite right
* Add rotation?