(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Onscroll = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Module dependencies
 */
var decouple = require('decouple');

/**
 * Privates
 */
var doc = window.document;
var scrollTimeout;

function Onscroll(options) {
    var that = this;
    this._checkCollection = {};
    options = options || {};
    this.elements = [].slice.call(options.elements);
    this.onScrollFunction = options.onScrollFunction || function(element) {
        console.log(element);
    };
    options.scrollTimeoutTick = options.scrollTimeoutTick || 250;
    this.threshold = options.threshold || (window.innerHeight / 3 );
    this.hasScrolled = false;

    function handleScroll() {
        if (!that.hasScrolled) {
            clearTimeout(scrollTimeout);
            that.hasScrolled = true;
            scrollTimeout = setTimeout(function() {
                that.doScrollActions();
                that.hasScrolled = false;
            }, options.scrollTimeoutTick);
        }
    }

    //Fire it initially to handle elements which are already in view
    window.addEventListener('load', function() {
        that.calculateElementPositions();
        decouple(window, 'scroll', handleScroll);
        handleScroll();
    });
}

Onscroll.prototype.getElements = function () {
    return this.elements;
};

Onscroll.prototype.calculateElementPositions = function () {
    var top;
    for(var i = 0; i < this.elements.length; i++) {
        top = this.elements[i].getBoundingClientRect().top + window.pageYOffset;
        this._addToCheckCollection(top - this.threshold, this.elements[i]);
    }
};

Onscroll.prototype._addToCheckCollection = function(position, element) {
    if (this._checkCollection[position]) {
        this._checkCollection[position].push(element);
    } else {
        this._checkCollection[position] = [element];
    }
};

Onscroll.prototype._checkPositionWithElements = function(windowPosition) {
    var elementsToHandle = [];
    for (var pos in this._checkCollection) {
        if (pos <= windowPosition && this._checkCollection[pos]) {
            elementsToHandle = elementsToHandle.concat(this._checkCollection[pos]);
            this._checkCollection[pos] = null;
        }
    }
    return elementsToHandle;
};

Onscroll.prototype.doScrollActions = function() {
    var elements = this ._checkPositionWithElements(window.pageYOffset);
    for(var i = 0; i < elements.length; i++) {
        this.onScrollFunction.call(null,elements[i]);
    }
};

/**
 * Expose Onscroll
 */
module.exports = Onscroll;
},{"decouple":2}],2:[function(require,module,exports){
'use strict';

var requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
}());

function decouple(node, event, fn) {
  var eve,
      tracking = false;

  function captureEvent(e) {
    eve = e;
    track();
  }

  function track() {
    if (!tracking) {
      requestAnimFrame(update);
      tracking = true;
    }
  }

  function update() {
    fn.call(node, eve);
    tracking = false;
  }

  node.addEventListener(event, captureEvent, false);
}

/**
 * Expose decouple
 */
module.exports = decouple;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWNvdXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG52YXIgZGVjb3VwbGUgPSByZXF1aXJlKCdkZWNvdXBsZScpO1xuXG4vKipcbiAqIFByaXZhdGVzXG4gKi9cbnZhciBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG52YXIgc2Nyb2xsVGltZW91dDtcblxuZnVuY3Rpb24gT25zY3JvbGwob3B0aW9ucykge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb24gPSB7fTtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmVsZW1lbnRzID0gW10uc2xpY2UuY2FsbChvcHRpb25zLmVsZW1lbnRzKTtcbiAgICB0aGlzLm9uU2Nyb2xsRnVuY3Rpb24gPSBvcHRpb25zLm9uU2Nyb2xsRnVuY3Rpb24gfHwgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50KTtcbiAgICB9O1xuICAgIG9wdGlvbnMuc2Nyb2xsVGltZW91dFRpY2sgPSBvcHRpb25zLnNjcm9sbFRpbWVvdXRUaWNrIHx8IDI1MDtcbiAgICB0aGlzLnRocmVzaG9sZCA9IG9wdGlvbnMudGhyZXNob2xkIHx8ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAzICk7XG4gICAgdGhpcy5oYXNTY3JvbGxlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsKCkge1xuICAgICAgICBpZiAoIXRoYXQuaGFzU2Nyb2xsZWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzY3JvbGxUaW1lb3V0KTtcbiAgICAgICAgICAgIHRoYXQuaGFzU2Nyb2xsZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2Nyb2xsVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5kb1Njcm9sbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB0aGF0Lmhhc1Njcm9sbGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCBvcHRpb25zLnNjcm9sbFRpbWVvdXRUaWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vRmlyZSBpdCBpbml0aWFsbHkgdG8gaGFuZGxlIGVsZW1lbnRzIHdoaWNoIGFyZSBhbHJlYWR5IGluIHZpZXdcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUVsZW1lbnRQb3NpdGlvbnMoKTtcbiAgICAgICAgZGVjb3VwbGUod2luZG93LCAnc2Nyb2xsJywgaGFuZGxlU2Nyb2xsKTtcbiAgICAgICAgaGFuZGxlU2Nyb2xsKCk7XG4gICAgfSk7XG59XG5cbk9uc2Nyb2xsLnByb3RvdHlwZS5nZXRFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcbn07XG5cbk9uc2Nyb2xsLnByb3RvdHlwZS5jYWxjdWxhdGVFbGVtZW50UG9zaXRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b3A7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG9wID0gdGhpcy5lbGVtZW50c1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIHRoaXMuX2FkZFRvQ2hlY2tDb2xsZWN0aW9uKHRvcCAtIHRoaXMudGhyZXNob2xkLCB0aGlzLmVsZW1lbnRzW2ldKTtcbiAgICB9XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuX2FkZFRvQ2hlY2tDb2xsZWN0aW9uID0gZnVuY3Rpb24ocG9zaXRpb24sIGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXSkge1xuICAgICAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb25bcG9zaXRpb25dLnB1c2goZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXSA9IFtlbGVtZW50XTtcbiAgICB9XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuX2NoZWNrUG9zaXRpb25XaXRoRWxlbWVudHMgPSBmdW5jdGlvbih3aW5kb3dQb3NpdGlvbikge1xuICAgIHZhciBlbGVtZW50c1RvSGFuZGxlID0gW107XG4gICAgZm9yICh2YXIgcG9zIGluIHRoaXMuX2NoZWNrQ29sbGVjdGlvbikge1xuICAgICAgICBpZiAocG9zIDw9IHdpbmRvd1Bvc2l0aW9uICYmIHRoaXMuX2NoZWNrQ29sbGVjdGlvbltwb3NdKSB7XG4gICAgICAgICAgICBlbGVtZW50c1RvSGFuZGxlID0gZWxlbWVudHNUb0hhbmRsZS5jb25jYXQodGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc10pO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc10gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50c1RvSGFuZGxlO1xufTtcblxuT25zY3JvbGwucHJvdG90eXBlLmRvU2Nyb2xsQWN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbGVtZW50cyA9IHRoaXMgLl9jaGVja1Bvc2l0aW9uV2l0aEVsZW1lbnRzKHdpbmRvdy5wYWdlWU9mZnNldCk7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMub25TY3JvbGxGdW5jdGlvbi5jYWxsKG51bGwsZWxlbWVudHNbaV0pO1xuICAgIH1cbn07XG5cbi8qKlxuICogRXhwb3NlIE9uc2Nyb2xsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gT25zY3JvbGw7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICB9O1xufSgpKTtcblxuZnVuY3Rpb24gZGVjb3VwbGUobm9kZSwgZXZlbnQsIGZuKSB7XG4gIHZhciBldmUsXG4gICAgICB0cmFja2luZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGNhcHR1cmVFdmVudChlKSB7XG4gICAgZXZlID0gZTtcbiAgICB0cmFjaygpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhY2soKSB7XG4gICAgaWYgKCF0cmFja2luZykge1xuICAgICAgcmVxdWVzdEFuaW1GcmFtZSh1cGRhdGUpO1xuICAgICAgdHJhY2tpbmcgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBmbi5jYWxsKG5vZGUsIGV2ZSk7XG4gICAgdHJhY2tpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FwdHVyZUV2ZW50LCBmYWxzZSk7XG59XG5cbi8qKlxuICogRXhwb3NlIGRlY291cGxlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZGVjb3VwbGU7XG4iXX0=
