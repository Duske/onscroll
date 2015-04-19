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


function Onscroll(options) {
    var that = this;
    this._checkCollection = {};


    options = options || {};
    this.elements = [].slice.call(options.elements);
    this.onScrollFunction = options.onScrollFunction || function(element) {
        console.log(element);
    };
    this.checkPositionBuffer = options.checkPositionBuffer || (window.innerHeight / 3 );

    //initialize
    this.calculateElementPositions();
    function handleScroll() {

        var elements = that._checkPositionWithElements(window.scrollY);
        for(var i = 0; i < elements.length; i++) {
            that.onScrollFunction.call(null,elements[i]);
            elements[i].style.background = '#000';
        }

    }
    decouple(window, 'scroll', handleScroll);

    //Fire it initially to handle elements which are already in view
    window.addEventListener('load', function() {
       handleScroll();
    });
}

Onscroll.prototype.getElements = function () {
    return this.elements;
};

Onscroll.prototype.calculateElementPositions = function () {
    var top;
    for(var i = 0; i < this.elements.length; i++) {
        top = this.elements[i].getBoundingClientRect().top;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWNvdXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG52YXIgZGVjb3VwbGUgPSByZXF1aXJlKCdkZWNvdXBsZScpO1xuXG4vKipcbiAqIFByaXZhdGVzXG4gKi9cbnZhciBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG5cblxuZnVuY3Rpb24gT25zY3JvbGwob3B0aW9ucykge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb24gPSB7fTtcblxuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwob3B0aW9ucy5lbGVtZW50cyk7XG4gICAgdGhpcy5vblNjcm9sbEZ1bmN0aW9uID0gb3B0aW9ucy5vblNjcm9sbEZ1bmN0aW9uIHx8IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgfTtcbiAgICB0aGlzLmNoZWNrUG9zaXRpb25CdWZmZXIgPSBvcHRpb25zLmNoZWNrUG9zaXRpb25CdWZmZXIgfHwgKHdpbmRvdy5pbm5lckhlaWdodCAvIDMgKTtcblxuICAgIC8vaW5pdGlhbGl6ZVxuICAgIHRoaXMuY2FsY3VsYXRlRWxlbWVudFBvc2l0aW9ucygpO1xuICAgIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbCgpIHtcblxuICAgICAgICB2YXIgZWxlbWVudHMgPSB0aGF0Ll9jaGVja1Bvc2l0aW9uV2l0aEVsZW1lbnRzKHdpbmRvdy5zY3JvbGxZKTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGF0Lm9uU2Nyb2xsRnVuY3Rpb24uY2FsbChudWxsLGVsZW1lbnRzW2ldKTtcbiAgICAgICAgICAgIGVsZW1lbnRzW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnIzAwMCc7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBkZWNvdXBsZSh3aW5kb3csICdzY3JvbGwnLCBoYW5kbGVTY3JvbGwpO1xuXG4gICAgLy9GaXJlIGl0IGluaXRpYWxseSB0byBoYW5kbGUgZWxlbWVudHMgd2hpY2ggYXJlIGFscmVhZHkgaW4gdmlld1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgaGFuZGxlU2Nyb2xsKCk7XG4gICAgfSk7XG59XG5cbk9uc2Nyb2xsLnByb3RvdHlwZS5nZXRFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcbn07XG5cbk9uc2Nyb2xsLnByb3RvdHlwZS5jYWxjdWxhdGVFbGVtZW50UG9zaXRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b3A7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG9wID0gdGhpcy5lbGVtZW50c1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgIHRoaXMuX2FkZFRvQ2hlY2tDb2xsZWN0aW9uKHRvcCAtIHRoaXMuY2hlY2tQb3NpdGlvbkJ1ZmZlciwgdGhpcy5lbGVtZW50c1tpXSk7XG4gICAgfVxufTtcblxuT25zY3JvbGwucHJvdG90eXBlLl9hZGRUb0NoZWNrQ29sbGVjdGlvbiA9IGZ1bmN0aW9uKHBvc2l0aW9uLCBlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2NoZWNrQ29sbGVjdGlvbltwb3NpdGlvbl0pIHtcbiAgICAgICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXS5wdXNoKGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2NoZWNrQ29sbGVjdGlvbltwb3NpdGlvbl0gPSBbZWxlbWVudF07XG4gICAgfVxufTtcblxuT25zY3JvbGwucHJvdG90eXBlLl9jaGVja1Bvc2l0aW9uV2l0aEVsZW1lbnRzID0gZnVuY3Rpb24od2luZG93UG9zaXRpb24pIHtcbiAgICB2YXIgZWxlbWVudHNUb0hhbmRsZSA9IFtdO1xuICAgIGZvciAodmFyIHBvcyBpbiB0aGlzLl9jaGVja0NvbGxlY3Rpb24pIHtcbiAgICAgICAgaWYgKHBvcyA8PSB3aW5kb3dQb3NpdGlvbiAmJiB0aGlzLl9jaGVja0NvbGxlY3Rpb25bcG9zXSkge1xuICAgICAgICAgICAgZWxlbWVudHNUb0hhbmRsZSA9IGVsZW1lbnRzVG9IYW5kbGUuY29uY2F0KHRoaXMuX2NoZWNrQ29sbGVjdGlvbltwb3NdKTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrQ29sbGVjdGlvbltwb3NdID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudHNUb0hhbmRsZTtcbn07XG5cblxuLyoqXG4gKiBFeHBvc2UgT25zY3JvbGxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBPbnNjcm9sbDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgIH07XG59KCkpO1xuXG5mdW5jdGlvbiBkZWNvdXBsZShub2RlLCBldmVudCwgZm4pIHtcbiAgdmFyIGV2ZSxcbiAgICAgIHRyYWNraW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gY2FwdHVyZUV2ZW50KGUpIHtcbiAgICBldmUgPSBlO1xuICAgIHRyYWNrKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFjaygpIHtcbiAgICBpZiAoIXRyYWNraW5nKSB7XG4gICAgICByZXF1ZXN0QW5pbUZyYW1lKHVwZGF0ZSk7XG4gICAgICB0cmFja2luZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGZuLmNhbGwobm9kZSwgZXZlKTtcbiAgICB0cmFja2luZyA9IGZhbHNlO1xuICB9XG5cbiAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYXB0dXJlRXZlbnQsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgZGVjb3VwbGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBkZWNvdXBsZTtcbiJdfQ==
