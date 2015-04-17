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