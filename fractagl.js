function draw() {
    offset[0] += -(actions.panleft ? scale / 25 : 0) + (actions.panright ? scale / 25 : 0);
    offset[1] += -(actions.pandown ? scale / 25 : 0) + (actions.panup ? scale / 25 : 0);
    scale = scale * (actions.zoomin ? 0.975 : 1.0) / (actions.zoomout ? 0.975 : 1.0);
    gl.uniform2f(program.canvasSizeUniform, canvas.width, canvas.height);
    gl.uniform2f(program.offsetUniform, offset[0], offset[1]);
    gl.uniform1f(program.scaleUniform, scale);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
    stats.scale.innerHTML = scale;
    stats.offsetX.innerHTML = offset[0];
    stats.offsetY.innerHTML = offset[1];
}

function addListeners(canvas) {
    // IE9, Chrome, Safari, Opera
    canvas.addEventListener("mousewheel", mouseWheelHandler, false);
    // Firefox
    canvas.addEventListener("DOMMouseScroll", mouseWheelHandler, false);

    canvas.addEventListener('mousedown', handleMouseDown, false);
    canvas.addEventListener('mouseup', handleMouseUp, false);
    canvas.addEventListener('touchstart', handleTouchStart, false);
    canvas.addEventListener('touchend', handleTouchEnd, false);
}

function doAction(action) {
    if (actions.hasOwnProperty(action)) {
        actions[action] = true;
        if (!iv) {
            iv = setInterval('draw();', 16);
        }
    }
}

function stopAction(action) {
    if (actions.hasOwnProperty(action)) {
        actions[action] = false;
        clearInterval(iv);
        iv = null;
    }
}

function goFullScreen() {
    var body;

    if (runPrefixMethod(document, 'FullScreen')) {
        runPrefixMethod(document, 'CancelFullScreen');
    } else {
        body = document.getElementById('body');
        runPrefixMethod(body, 'RequestFullScreen');
    }
}

function resizeCanvas(canvas) {
    var wasResized = false;

    if (canvas.width != window.innerWidth) {
        canvas.width = window.innerWidth;
        wasResized = true;
    }

    if (canvas.height != window.innerHeight) {
        canvas.height = window.innerHeight;
        wasResized = true;
    }

    return wasResized;

}

function resize() {
    var wasResized = resizeCanvas(canvas);

    if (wasResized === true) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        draw();
    }
}

function runPrefixMethod(obj, method) {
    var prefixes = ["webkit", "moz", "ms", "o", ""];
    var p = 0, m, t;
    while (p < prefixes.length && !obj[m]) {
        m = method;
        if (prefixes[p] == "") {
            m = m.substr(0,1).toLowerCase() + m.substr(1);
        }
        m = prefixes[p] + m;
        t = typeof obj[m];
        if (t != "undefined") {
            prefixes = [prefixes[p]];
            return (t == "function" ? obj[m]() : obj[m]);
        }
        p++;
    }
    return undefined;
}

function mouseWheelHandler(e) {
    // Firefox uses detail, others use wheelDelta
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (delta > 0) {
        actions.zoomin = true;
        draw();
        actions.zoomin = false;
    } else if (delta < 0) {
        actions.zoomout = true;
        draw();
        actions.zoomout = false;
    }
}

function handleMouseDown(evt) {
    var x = evt.pageX - canvas.offsetLeft;
    var y = evt.pageY - canvas.offsetTop;
    dragStartedAt = [ x, y ];
    dragOk = true;
    canvas.onmousemove = handleMouseMove;
    canvas.addEventListener('mousemove', handleMouseMove, false);
    if (!iv) {
        iv = setInterval('draw();', 16);
    }
}

function handleMouseUp(evt) {
    var x = evt.pageX - canvas.offsetLeft;
    var y = evt.pageY - canvas.offsetTop;
    dragEndedAt = [ x, y ];
    var diff = [ dragStartedAt[0]-dragEndedAt[0], dragStartedAt[1]-dragEndedAt[1] ];
    dragOk =false;
    //canvas.onmousemove = null;
    canvas.removeEventListener('mousemove', handleMouseMove, false);

    offset[0] += (diff[0] / canvas.width) * scale * 2.0;
    offset[1] -= (diff[1] / canvas.height) * scale * 2.0;
    clearInterval(iv);
    iv = null;
}

function handleMouseMove(evt){
    if (dragOk){
        var x = evt.pageX - canvas.offsetLeft;
        var y = evt.pageY - canvas.offsetTop;

        dragEndedAt = [ x, y ];
        var diff = [ dragStartedAt[0]-dragEndedAt[0], dragStartedAt[1]-dragEndedAt[1] ];

        offset[0] += (diff[0] / canvas.width) * scale * 2.0;
        offset[1] -= (diff[1] / canvas.height) * scale * 2.0;
        //draw();

        dragStartedAt = dragEndedAt;
    }
}


var panTouchStartedAt = new Array(2);
var panTouchEndedAt = new Array(2);
var pinchTouchesStartedAt;
var pinchTouchesEndedAt;

function handleTouchStart(evt) {
    evt.preventDefault();

    var touches = evt.touches;
    var i;
    switch (touches.length) {
        case 1: // pan
            panTouchStartedAt[0] = touches[0].pageX - canvas.offsetLeft;
            panTouchStartedAt[1] = touches[0].pageY - canvas.offsetTop;
            break;
        case 2:
            pinchTouchesStartedAt = new Array(2);
            pinchTouchesEndedAt = [];
            for (i = 0; i < touches.length ; i++) {
                pinchTouchesStartedAt[i] = [
                    touches[i].pageX - canvas.offsetLeft,
                    touches[i].pageY - canvas.offsetTop
                ];
            }
    }
    canvas.addEventListener('touchmove', handleTouchMove, false);
    if (!iv) {
        iv = setInterval('draw();', 16);
    }
}

function handleTouchEnd(evt) {
    evt.preventDefault();

    canvas.removeEventListener('touchmove', handleTouchMove, false);
    clearInterval(iv);
    iv = null;
}

function handleTouchMove(evt){
    evt.preventDefault();

    var touches = evt.touches;
    var i;
    switch (touches.length) {
        case 1: // drag (pan)
            panTouchEndedAt[0] = touches[0].pageX - canvas.offsetLeft;
            panTouchEndedAt[1] = touches[0].pageY - canvas.offsetTop;

            var diff = [ 0, 0 ]; // x, y
            diff[0] += panTouchStartedAt[0]-panTouchEndedAt[0];
            diff[1] += panTouchStartedAt[1]-panTouchEndedAt[1];

            offset[0] += (diff[0] / canvas.width) * scale * 2.0;
            offset[1] -= (diff[1] / canvas.height) * scale * 2.0;

            panTouchStartedAt[0] = panTouchEndedAt[0];
            panTouchStartedAt[1] = panTouchEndedAt[1];
            break;

        case 2: // pinch (zoom)
            pinchTouchesEndedAt = new Array(2)
            for (i = 0; i < touches.length ; i++) {
                pinchTouchesEndedAt[i] = [
                    touches[i].pageX - canvas.offsetLeft,
                    touches[i].pageY - canvas.offsetTop
                ];
            }

            var distanceStart = Math.sqrt(
                square(pinchTouchesStartedAt[0][0] - pinchTouchesStartedAt[1][0]) +
                    square(pinchTouchesStartedAt[0][1] - pinchTouchesStartedAt[1][1])
            );

            var distanceEnd = Math.sqrt(
                square(pinchTouchesEndedAt[0][0] - pinchTouchesEndedAt[1][0]) +
                    square(pinchTouchesEndedAt[0][1] - pinchTouchesEndedAt[1][1])
            );

            var maxDistance = distance(0, 0, canvas.width, canvas.height);
            var scaleDelta = 1 - 2* ((distanceEnd - distanceStart) / maxDistance);
            scale *= scaleDelta;
            pinchTouchesStartedAt = pinchTouchesEndedAt;
    }
}


// Utilities

function square(a) {
    return a * a;
}

function distance(x0, y0, x1, y1) {
    return Math.sqrt(square(x0-x1) + square(y0-y1));
}

function Logger() {
    var logQueue = [];
    var maxQueueLength = 10;
    var counter = 0;

    this.log = function(message) {
        counter++;
        if (logQueue.length == maxQueueLength) {
            logQueue.shift();
        }
        logQueue.push(counter + ': ' + message);
        updateLogDisplay();
    }

    function updateLogDisplay() {
        var logElement = document.getElementById('log');
        var content = '';
        for(var i = 0; i < logQueue.length ; i++) {
            content += logQueue[i] + '<br />\n';
        }
        logElement.innerHTML = content;
    }
}