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
    this.checkPositionBuffer = options.checkPositionBuffer || (window.innerHeight / 3 );
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
        this._addToCheckCollection(top - this.checkPositionBuffer, this.elements[i]);
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
    var elements = this._checkPositionWithElements(window.pageYOffset);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWNvdXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG52YXIgZGVjb3VwbGUgPSByZXF1aXJlKCdkZWNvdXBsZScpO1xuXG4vKipcbiAqIFByaXZhdGVzXG4gKi9cbnZhciBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG52YXIgc2Nyb2xsVGltZW91dDtcblxuZnVuY3Rpb24gT25zY3JvbGwob3B0aW9ucykge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb24gPSB7fTtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmVsZW1lbnRzID0gW10uc2xpY2UuY2FsbChvcHRpb25zLmVsZW1lbnRzKTtcbiAgICB0aGlzLm9uU2Nyb2xsRnVuY3Rpb24gPSBvcHRpb25zLm9uU2Nyb2xsRnVuY3Rpb24gfHwgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50KTtcbiAgICB9O1xuICAgIG9wdGlvbnMuc2Nyb2xsVGltZW91dFRpY2sgPSBvcHRpb25zLnNjcm9sbFRpbWVvdXRUaWNrIHx8IDI1MDtcbiAgICB0aGlzLmNoZWNrUG9zaXRpb25CdWZmZXIgPSBvcHRpb25zLmNoZWNrUG9zaXRpb25CdWZmZXIgfHwgKHdpbmRvdy5pbm5lckhlaWdodCAvIDMgKTtcbiAgICB0aGlzLmhhc1Njcm9sbGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTY3JvbGwoKSB7XG4gICAgICAgIGlmICghdGhhdC5oYXNTY3JvbGxlZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVvdXQpO1xuICAgICAgICAgICAgdGhhdC5oYXNTY3JvbGxlZCA9IHRydWU7XG4gICAgICAgICAgICBzY3JvbGxUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmRvU2Nyb2xsQWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHRoYXQuaGFzU2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIG9wdGlvbnMuc2Nyb2xsVGltZW91dFRpY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9GaXJlIGl0IGluaXRpYWxseSB0byBoYW5kbGUgZWxlbWVudHMgd2hpY2ggYXJlIGFscmVhZHkgaW4gdmlld1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRWxlbWVudFBvc2l0aW9ucygpO1xuICAgICAgICBkZWNvdXBsZSh3aW5kb3csICdzY3JvbGwnLCBoYW5kbGVTY3JvbGwpO1xuICAgICAgICBoYW5kbGVTY3JvbGwoKTtcbiAgICB9KTtcbn1cblxuT25zY3JvbGwucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xufTtcblxuT25zY3JvbGwucHJvdG90eXBlLmNhbGN1bGF0ZUVsZW1lbnRQb3NpdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRvcDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b3AgPSB0aGlzLmVsZW1lbnRzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgdGhpcy5fYWRkVG9DaGVja0NvbGxlY3Rpb24odG9wIC0gdGhpcy5jaGVja1Bvc2l0aW9uQnVmZmVyLCB0aGlzLmVsZW1lbnRzW2ldKTtcbiAgICB9XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuX2FkZFRvQ2hlY2tDb2xsZWN0aW9uID0gZnVuY3Rpb24ocG9zaXRpb24sIGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXSkge1xuICAgICAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb25bcG9zaXRpb25dLnB1c2goZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXSA9IFtlbGVtZW50XTtcbiAgICB9XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuX2NoZWNrUG9zaXRpb25XaXRoRWxlbWVudHMgPSBmdW5jdGlvbih3aW5kb3dQb3NpdGlvbikge1xuICAgIHZhciBlbGVtZW50c1RvSGFuZGxlID0gW107XG4gICAgZm9yICh2YXIgcG9zIGluIHRoaXMuX2NoZWNrQ29sbGVjdGlvbikge1xuICAgICAgICBpZiAocG9zIDw9IHdpbmRvd1Bvc2l0aW9uICYmIHRoaXMuX2NoZWNrQ29sbGVjdGlvbltwb3NdKSB7XG4gICAgICAgICAgICBlbGVtZW50c1RvSGFuZGxlID0gZWxlbWVudHNUb0hhbmRsZS5jb25jYXQodGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc10pO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc10gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50c1RvSGFuZGxlO1xufTtcblxuT25zY3JvbGwucHJvdG90eXBlLmRvU2Nyb2xsQWN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbGVtZW50cyA9IHRoaXMuX2NoZWNrUG9zaXRpb25XaXRoRWxlbWVudHMod2luZG93LnBhZ2VZT2Zmc2V0KTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5vblNjcm9sbEZ1bmN0aW9uLmNhbGwobnVsbCxlbGVtZW50c1tpXSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBFeHBvc2UgT25zY3JvbGxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBPbnNjcm9sbDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgIH07XG59KCkpO1xuXG5mdW5jdGlvbiBkZWNvdXBsZShub2RlLCBldmVudCwgZm4pIHtcbiAgdmFyIGV2ZSxcbiAgICAgIHRyYWNraW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gY2FwdHVyZUV2ZW50KGUpIHtcbiAgICBldmUgPSBlO1xuICAgIHRyYWNrKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFjaygpIHtcbiAgICBpZiAoIXRyYWNraW5nKSB7XG4gICAgICByZXF1ZXN0QW5pbUZyYW1lKHVwZGF0ZSk7XG4gICAgICB0cmFja2luZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGZuLmNhbGwobm9kZSwgZXZlKTtcbiAgICB0cmFja2luZyA9IGZhbHNlO1xuICB9XG5cbiAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYXB0dXJlRXZlbnQsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgZGVjb3VwbGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBkZWNvdXBsZTtcbiJdfQ==
