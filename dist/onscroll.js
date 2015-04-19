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

    function handleScroll() {

        var elements = that._checkPositionWithElements(window.scrollY);
        for(var i = 0; i < elements.length; i++) {
            that.onScrollFunction.call(null,elements[i]);
        }

    }
    decouple(window, 'scroll', handleScroll);

    //Fire it initially to handle elements which are already in view
    window.addEventListener('load', function() {
        that.calculateElementPositions();
        handleScroll();
    });
}

Onscroll.prototype.getElements = function () {
    return this.elements;
};

Onscroll.prototype.calculateElementPositions = function () {
    var top;
    for(var i = 0; i < this.elements.length; i++) {
        top = this.elements[i].getBoundingClientRect().top + window.scrollY;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWNvdXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG52YXIgZGVjb3VwbGUgPSByZXF1aXJlKCdkZWNvdXBsZScpO1xuXG4vKipcbiAqIFByaXZhdGVzXG4gKi9cbnZhciBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG5cblxuZnVuY3Rpb24gT25zY3JvbGwob3B0aW9ucykge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb24gPSB7fTtcblxuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwob3B0aW9ucy5lbGVtZW50cyk7XG4gICAgdGhpcy5vblNjcm9sbEZ1bmN0aW9uID0gb3B0aW9ucy5vblNjcm9sbEZ1bmN0aW9uIHx8IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgfTtcbiAgICB0aGlzLmNoZWNrUG9zaXRpb25CdWZmZXIgPSBvcHRpb25zLmNoZWNrUG9zaXRpb25CdWZmZXIgfHwgKHdpbmRvdy5pbm5lckhlaWdodCAvIDMgKTtcblxuICAgIC8vaW5pdGlhbGl6ZVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsKCkge1xuXG4gICAgICAgIHZhciBlbGVtZW50cyA9IHRoYXQuX2NoZWNrUG9zaXRpb25XaXRoRWxlbWVudHMod2luZG93LnNjcm9sbFkpO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoYXQub25TY3JvbGxGdW5jdGlvbi5jYWxsKG51bGwsZWxlbWVudHNbaV0pO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgZGVjb3VwbGUod2luZG93LCAnc2Nyb2xsJywgaGFuZGxlU2Nyb2xsKTtcblxuICAgIC8vRmlyZSBpdCBpbml0aWFsbHkgdG8gaGFuZGxlIGVsZW1lbnRzIHdoaWNoIGFyZSBhbHJlYWR5IGluIHZpZXdcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUVsZW1lbnRQb3NpdGlvbnMoKTtcbiAgICAgICAgaGFuZGxlU2Nyb2xsKCk7XG4gICAgfSk7XG59XG5cbk9uc2Nyb2xsLnByb3RvdHlwZS5nZXRFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcbn07XG5cbk9uc2Nyb2xsLnByb3RvdHlwZS5jYWxjdWxhdGVFbGVtZW50UG9zaXRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b3A7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG9wID0gdGhpcy5lbGVtZW50c1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgdGhpcy5fYWRkVG9DaGVja0NvbGxlY3Rpb24odG9wIC0gdGhpcy5jaGVja1Bvc2l0aW9uQnVmZmVyLCB0aGlzLmVsZW1lbnRzW2ldKTtcbiAgICB9XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuX2FkZFRvQ2hlY2tDb2xsZWN0aW9uID0gZnVuY3Rpb24ocG9zaXRpb24sIGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXSkge1xuICAgICAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb25bcG9zaXRpb25dLnB1c2goZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXSA9IFtlbGVtZW50XTtcbiAgICB9XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuX2NoZWNrUG9zaXRpb25XaXRoRWxlbWVudHMgPSBmdW5jdGlvbih3aW5kb3dQb3NpdGlvbikge1xuICAgIHZhciBlbGVtZW50c1RvSGFuZGxlID0gW107XG4gICAgZm9yICh2YXIgcG9zIGluIHRoaXMuX2NoZWNrQ29sbGVjdGlvbikge1xuICAgICAgICBpZiAocG9zIDw9IHdpbmRvd1Bvc2l0aW9uICYmIHRoaXMuX2NoZWNrQ29sbGVjdGlvbltwb3NdKSB7XG4gICAgICAgICAgICBlbGVtZW50c1RvSGFuZGxlID0gZWxlbWVudHNUb0hhbmRsZS5jb25jYXQodGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc10pO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc10gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50c1RvSGFuZGxlO1xufTtcblxuXG4vKipcbiAqIEV4cG9zZSBPbnNjcm9sbFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IE9uc2Nyb2xsOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgfTtcbn0oKSk7XG5cbmZ1bmN0aW9uIGRlY291cGxlKG5vZGUsIGV2ZW50LCBmbikge1xuICB2YXIgZXZlLFxuICAgICAgdHJhY2tpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBjYXB0dXJlRXZlbnQoZSkge1xuICAgIGV2ZSA9IGU7XG4gICAgdHJhY2soKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWNrKCkge1xuICAgIGlmICghdHJhY2tpbmcpIHtcbiAgICAgIHJlcXVlc3RBbmltRnJhbWUodXBkYXRlKTtcbiAgICAgIHRyYWNraW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgZm4uY2FsbChub2RlLCBldmUpO1xuICAgIHRyYWNraW5nID0gZmFsc2U7XG4gIH1cblxuICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhcHR1cmVFdmVudCwgZmFsc2UpO1xufVxuXG4vKipcbiAqIEV4cG9zZSBkZWNvdXBsZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGRlY291cGxlO1xuIl19
