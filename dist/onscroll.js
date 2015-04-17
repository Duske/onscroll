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
    options = options || {};

    this.elements = [].slice.call(options.elements);

    this._checkCollection = {};
    console.log(doc, window);
    doc.title = "onscroll";

    var that = this;
    function handleScroll(event) {
        console.log('scrolled');

        // The function receive the scroll event as parameter.
        console.log(event);

        // The function context is the given node.
        console.log(this.scrollTop);

        var elements = that._checkPositionWithElements(window.pageYOffset);
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.background = '#000';
        }

    }
    decouple(window, 'scroll', handleScroll);
}

Onscroll.prototype.getElements = function () {
    return this.elements;
};

Onscroll.prototype.calculateElementPositions = function () {
    var top;
    for(var i = 0; i < this.elements.length; i++) {
        top = this.elements[i].getBoundingClientRect().top;
        this._addToCheckCollection(top, this.elements[i]);
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
            elementsToHandle.concat(this._checkCollection[pos]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWNvdXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xudmFyIGRlY291cGxlID0gcmVxdWlyZSgnZGVjb3VwbGUnKTtcblxuLyoqXG4gKiBQcml2YXRlc1xuICovXG52YXIgZG9jID0gd2luZG93LmRvY3VtZW50O1xuXG5cbmZ1bmN0aW9uIE9uc2Nyb2xsKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMuZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKG9wdGlvbnMuZWxlbWVudHMpO1xuXG4gICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uID0ge307XG4gICAgY29uc29sZS5sb2coZG9jLCB3aW5kb3cpO1xuICAgIGRvYy50aXRsZSA9IFwib25zY3JvbGxcIjtcblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBmdW5jdGlvbiBoYW5kbGVTY3JvbGwoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Njcm9sbGVkJyk7XG5cbiAgICAgICAgLy8gVGhlIGZ1bmN0aW9uIHJlY2VpdmUgdGhlIHNjcm9sbCBldmVudCBhcyBwYXJhbWV0ZXIuXG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcblxuICAgICAgICAvLyBUaGUgZnVuY3Rpb24gY29udGV4dCBpcyB0aGUgZ2l2ZW4gbm9kZS5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zY3JvbGxUb3ApO1xuXG4gICAgICAgIHZhciBlbGVtZW50cyA9IHRoYXQuX2NoZWNrUG9zaXRpb25XaXRoRWxlbWVudHMod2luZG93LnBhZ2VZT2Zmc2V0KTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBlbGVtZW50c1tpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJyMwMDAnO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgZGVjb3VwbGUod2luZG93LCAnc2Nyb2xsJywgaGFuZGxlU2Nyb2xsKTtcbn1cblxuT25zY3JvbGwucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xufTtcblxuT25zY3JvbGwucHJvdG90eXBlLmNhbGN1bGF0ZUVsZW1lbnRQb3NpdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRvcDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b3AgPSB0aGlzLmVsZW1lbnRzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgdGhpcy5fYWRkVG9DaGVja0NvbGxlY3Rpb24odG9wLCB0aGlzLmVsZW1lbnRzW2ldKTtcbiAgICB9XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuX2FkZFRvQ2hlY2tDb2xsZWN0aW9uID0gZnVuY3Rpb24ocG9zaXRpb24sIGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXSkge1xuICAgICAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb25bcG9zaXRpb25dLnB1c2goZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXSA9IFtlbGVtZW50XTtcbiAgICB9XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuX2NoZWNrUG9zaXRpb25XaXRoRWxlbWVudHMgPSBmdW5jdGlvbih3aW5kb3dQb3NpdGlvbikge1xuICAgIHZhciBlbGVtZW50c1RvSGFuZGxlID0gW107XG4gICAgZm9yICh2YXIgcG9zIGluIHRoaXMuX2NoZWNrQ29sbGVjdGlvbikge1xuICAgICAgICBpZiAocG9zIDw9IHdpbmRvd1Bvc2l0aW9uICYmIHRoaXMuX2NoZWNrQ29sbGVjdGlvbltwb3NdKSB7XG4gICAgICAgICAgICBlbGVtZW50c1RvSGFuZGxlLmNvbmNhdCh0aGlzLl9jaGVja0NvbGxlY3Rpb25bcG9zXSk7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb25bcG9zXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRzVG9IYW5kbGU7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBPbnNjcm9sbFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IE9uc2Nyb2xsOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgfTtcbn0oKSk7XG5cbmZ1bmN0aW9uIGRlY291cGxlKG5vZGUsIGV2ZW50LCBmbikge1xuICB2YXIgZXZlLFxuICAgICAgdHJhY2tpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBjYXB0dXJlRXZlbnQoZSkge1xuICAgIGV2ZSA9IGU7XG4gICAgdHJhY2soKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWNrKCkge1xuICAgIGlmICghdHJhY2tpbmcpIHtcbiAgICAgIHJlcXVlc3RBbmltRnJhbWUodXBkYXRlKTtcbiAgICAgIHRyYWNraW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgZm4uY2FsbChub2RlLCBldmUpO1xuICAgIHRyYWNraW5nID0gZmFsc2U7XG4gIH1cblxuICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhcHR1cmVFdmVudCwgZmFsc2UpO1xufVxuXG4vKipcbiAqIEV4cG9zZSBkZWNvdXBsZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGRlY291cGxlO1xuIl19
