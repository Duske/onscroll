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

Onscroll.prototype.addNewElements = function (elements) {
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