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