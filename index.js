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