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

    //Options
    options = options || {};
    this.elements = [].slice.call(options.elements);
    this.onScrollFunction = options.onScrollFunction || function(element) {
        console.log(element);
    };
    this.scrollTimeoutTick = options.scrollTimeoutTick || 250;
    this.threshold = options.threshold || (window.innerHeight / 3 );

    //Scroll Handler
    this.hasScrolled = false;
    function handleScroll() {
        if (!that.hasScrolled) {
            clearTimeout(scrollTimeout);
            that.hasScrolled = true;
            scrollTimeout = setTimeout(function() {
                that.doScrollActions();
                that.hasScrolled = false;
            }, that.scrollTimeoutTick);
        }
    }

    //Fire it initially to handle elements which are already in view
    window.addEventListener('load', function() {
        that._calculateElementPositions(that.elements);
        decouple(window, 'scroll', handleScroll);
        handleScroll();
    });
}

Onscroll.prototype.getElements = function () {
    return this.elements;
};

Onscroll.prototype.setElements = function (newElements) {
    this.elements = newElements;
};

Onscroll.prototype.addElements = function (elementsToAdd) {
    this.setElements(this.getElements().concat(elementsToAdd));
};

Onscroll.prototype.changeElements = function (newElements) {
    this.setElements(newElements);
    this._calculateElementPositions();
};

Onscroll.prototype.updateAllElementPositions = function () {
    this._checkCollection = {};
    this._calculateElementPositions(this.elements);
    this.doScrollActions();
};

Onscroll.prototype.add = function (elements) {
    if(!Array.isArray(elements)) {
        elements = [elements];
    }
    this.addElements(elements);
    this._calculateElementPositions(elements);
    this.doScrollActions();
};

Onscroll.prototype._calculateElementPositions = function (elements) {
    var top;
    for(var i = 0; i < elements.length; i++) {
        top = elements[i].getBoundingClientRect().top + window.pageYOffset;
        this._addToCheckCollection(top - this.threshold, elements[i]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWNvdXBsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBkZWNvdXBsZSA9IHJlcXVpcmUoJ2RlY291cGxlJyk7XG5cbi8qKlxuICogUHJpdmF0ZXNcbiAqL1xudmFyIGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbnZhciBzY3JvbGxUaW1lb3V0O1xuXG5mdW5jdGlvbiBPbnNjcm9sbChvcHRpb25zKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHRoaXMuX2NoZWNrQ29sbGVjdGlvbiA9IHt9O1xuXG4gICAgLy9PcHRpb25zXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwob3B0aW9ucy5lbGVtZW50cyk7XG4gICAgdGhpcy5vblNjcm9sbEZ1bmN0aW9uID0gb3B0aW9ucy5vblNjcm9sbEZ1bmN0aW9uIHx8IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgfTtcbiAgICB0aGlzLnNjcm9sbFRpbWVvdXRUaWNrID0gb3B0aW9ucy5zY3JvbGxUaW1lb3V0VGljayB8fCAyNTA7XG4gICAgdGhpcy50aHJlc2hvbGQgPSBvcHRpb25zLnRocmVzaG9sZCB8fCAod2luZG93LmlubmVySGVpZ2h0IC8gMyApO1xuXG4gICAgLy9TY3JvbGwgSGFuZGxlclxuICAgIHRoaXMuaGFzU2Nyb2xsZWQgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBoYW5kbGVTY3JvbGwoKSB7XG4gICAgICAgIGlmICghdGhhdC5oYXNTY3JvbGxlZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVvdXQpO1xuICAgICAgICAgICAgdGhhdC5oYXNTY3JvbGxlZCA9IHRydWU7XG4gICAgICAgICAgICBzY3JvbGxUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmRvU2Nyb2xsQWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHRoYXQuaGFzU2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIHRoYXQuc2Nyb2xsVGltZW91dFRpY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9GaXJlIGl0IGluaXRpYWxseSB0byBoYW5kbGUgZWxlbWVudHMgd2hpY2ggYXJlIGFscmVhZHkgaW4gdmlld1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuX2NhbGN1bGF0ZUVsZW1lbnRQb3NpdGlvbnModGhhdC5lbGVtZW50cyk7XG4gICAgICAgIGRlY291cGxlKHdpbmRvdywgJ3Njcm9sbCcsIGhhbmRsZVNjcm9sbCk7XG4gICAgICAgIGhhbmRsZVNjcm9sbCgpO1xuICAgIH0pO1xufVxuXG5PbnNjcm9sbC5wcm90b3R5cGUuZ2V0RWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHM7XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuc2V0RWxlbWVudHMgPSBmdW5jdGlvbiAobmV3RWxlbWVudHMpIHtcbiAgICB0aGlzLmVsZW1lbnRzID0gbmV3RWxlbWVudHM7XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuYWRkRWxlbWVudHMgPSBmdW5jdGlvbiAoZWxlbWVudHNUb0FkZCkge1xuICAgIHRoaXMuc2V0RWxlbWVudHModGhpcy5nZXRFbGVtZW50cygpLmNvbmNhdChlbGVtZW50c1RvQWRkKSk7XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuY2hhbmdlRWxlbWVudHMgPSBmdW5jdGlvbiAobmV3RWxlbWVudHMpIHtcbiAgICB0aGlzLnNldEVsZW1lbnRzKG5ld0VsZW1lbnRzKTtcbiAgICB0aGlzLl9jYWxjdWxhdGVFbGVtZW50UG9zaXRpb25zKCk7XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUudXBkYXRlQWxsRWxlbWVudFBvc2l0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb24gPSB7fTtcbiAgICB0aGlzLl9jYWxjdWxhdGVFbGVtZW50UG9zaXRpb25zKHRoaXMuZWxlbWVudHMpO1xuICAgIHRoaXMuZG9TY3JvbGxBY3Rpb25zKCk7XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gICAgaWYoIUFycmF5LmlzQXJyYXkoZWxlbWVudHMpKSB7XG4gICAgICAgIGVsZW1lbnRzID0gW2VsZW1lbnRzXTtcbiAgICB9XG4gICAgdGhpcy5hZGRFbGVtZW50cyhlbGVtZW50cyk7XG4gICAgdGhpcy5fY2FsY3VsYXRlRWxlbWVudFBvc2l0aW9ucyhlbGVtZW50cyk7XG4gICAgdGhpcy5kb1Njcm9sbEFjdGlvbnMoKTtcbn07XG5cbk9uc2Nyb2xsLnByb3RvdHlwZS5fY2FsY3VsYXRlRWxlbWVudFBvc2l0aW9ucyA9IGZ1bmN0aW9uIChlbGVtZW50cykge1xuICAgIHZhciB0b3A7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRvcCA9IGVsZW1lbnRzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgdGhpcy5fYWRkVG9DaGVja0NvbGxlY3Rpb24odG9wIC0gdGhpcy50aHJlc2hvbGQsIGVsZW1lbnRzW2ldKTtcbiAgICB9XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuX2FkZFRvQ2hlY2tDb2xsZWN0aW9uID0gZnVuY3Rpb24ocG9zaXRpb24sIGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXSkge1xuICAgICAgICB0aGlzLl9jaGVja0NvbGxlY3Rpb25bcG9zaXRpb25dLnB1c2goZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc2l0aW9uXSA9IFtlbGVtZW50XTtcbiAgICB9XG59O1xuXG5PbnNjcm9sbC5wcm90b3R5cGUuX2NoZWNrUG9zaXRpb25XaXRoRWxlbWVudHMgPSBmdW5jdGlvbih3aW5kb3dQb3NpdGlvbikge1xuICAgIHZhciBlbGVtZW50c1RvSGFuZGxlID0gW107XG4gICAgZm9yICh2YXIgcG9zIGluIHRoaXMuX2NoZWNrQ29sbGVjdGlvbikge1xuICAgICAgICBpZiAocG9zIDw9IHdpbmRvd1Bvc2l0aW9uICYmIHRoaXMuX2NoZWNrQ29sbGVjdGlvbltwb3NdKSB7XG4gICAgICAgICAgICBlbGVtZW50c1RvSGFuZGxlID0gZWxlbWVudHNUb0hhbmRsZS5jb25jYXQodGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc10pO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tDb2xsZWN0aW9uW3Bvc10gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50c1RvSGFuZGxlO1xufTtcblxuT25zY3JvbGwucHJvdG90eXBlLmRvU2Nyb2xsQWN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbGVtZW50cyA9IHRoaXMuX2NoZWNrUG9zaXRpb25XaXRoRWxlbWVudHMod2luZG93LnBhZ2VZT2Zmc2V0KTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5vblNjcm9sbEZ1bmN0aW9uLmNhbGwobnVsbCxlbGVtZW50c1tpXSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBFeHBvc2UgT25zY3JvbGxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBPbnNjcm9sbDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgIH07XG59KCkpO1xuXG5mdW5jdGlvbiBkZWNvdXBsZShub2RlLCBldmVudCwgZm4pIHtcbiAgdmFyIGV2ZSxcbiAgICAgIHRyYWNraW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gY2FwdHVyZUV2ZW50KGUpIHtcbiAgICBldmUgPSBlO1xuICAgIHRyYWNrKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFjaygpIHtcbiAgICBpZiAoIXRyYWNraW5nKSB7XG4gICAgICByZXF1ZXN0QW5pbUZyYW1lKHVwZGF0ZSk7XG4gICAgICB0cmFja2luZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGZuLmNhbGwobm9kZSwgZXZlKTtcbiAgICB0cmFja2luZyA9IGZhbHNlO1xuICB9XG5cbiAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYXB0dXJlRXZlbnQsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgZGVjb3VwbGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBkZWNvdXBsZTtcbiJdfQ==
