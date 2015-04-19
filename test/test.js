//if executed with node
if (exports) {
    var fs = require('fs');
    var jsdom = require('jsdom');
    var html = fs.readFileSync('./test/index.html', 'utf-8');
    window = jsdom.jsdom(html).parentWindow;
    var assert = require('better-assert');
    var Onscroll = require('../');
}
var doc = window.document;
var onscroll = new Onscroll({
    elements: doc.getElementsByClassName('scrollElement'),
    onScrollFunction: function(element) {
        element.classList.add('scrolledTo');
    },
    checkPositionBuffer: window.innerHeight / 2
});

describe('onscroll', function () {

    it('should be defined.', function () {
        assert(Onscroll !== undefined);
    });

    it('should be a function.', function () {
        assert(typeof Onscroll === 'function');
    });

    describe('_addToCheckCollection', function () {
        before(function(){
           onscroll._checkCollection = {};
        });
        it('should be an empty collection initially.', function () {
            assert(typeof onscroll._checkCollection == 'object');
            assert(Object.keys(onscroll._checkCollection).length == 0);
        });
        it('should add the first item correctly.', function () {
            onscroll._addToCheckCollection('10', 'first');
            assert(isArray(onscroll._checkCollection['10']));
            assert(onscroll._checkCollection['10'][0] == 'first');
            assert(Object.keys(onscroll._checkCollection).length == 1);
        });
        it('should add the second item correctly.', function () {
            onscroll._addToCheckCollection('10', 'second');
            assert(onscroll._checkCollection['10'][1] == 'second');
            assert(onscroll._checkCollection['10'].length == 2);
            assert(Object.keys(onscroll._checkCollection).length == 1);
        });
        it('should add various items correctly.', function () {
            onscroll._addToCheckCollection('20', 'third');
            assert(isArray(onscroll._checkCollection['20']));
            assert(Object.keys(onscroll._checkCollection).length == 2);
        });
        after(function(){
            onscroll._checkCollection = {};
        });
    });

    describe('_checkPositionWithElements', function () {
        before(function(){
            onscroll._checkCollection = {
                10: ['first', 'second'],
                20: ['third'],
                30: ['fourth']
            };
        });
        it('should return an empty array when no element matches.', function () {
            var elements = onscroll._checkPositionWithElements(0);
            assert(isArray(elements));
            assert(elements.length == 0);
        });
        it('should return an filled array when element matches.', function () {
            var elements = onscroll._checkPositionWithElements(10);
            assert(isArray(elements));
            assert(elements.length == 2);
            assert(elements[0] === 'first');
            assert(elements[1] === 'second');
        });
        it('should remove elements from collection if they have matched.', function () {
            assert(onscroll._checkCollection[10] == null);
            assert(onscroll._checkCollection[20] != null);
            assert(onscroll._checkCollection[30] != null);
        });
        it('should match multiple positions entries.', function () {
            var elements = onscroll._checkPositionWithElements(31);
            assert(elements.length == 2);
            assert(elements[0] === 'third');
            assert(elements[1] === 'fourth');
            assert(onscroll._checkCollection[20] == null);
            assert(onscroll._checkCollection[30] == null);
        });
        after(function(){
            onscroll._checkCollection = {};
        });
    });

    describe('fire function when scrolled to element', function () {
        before(function(){
            onscroll.calculateElementPositions();
        });
        it('should fire the given method when scrolling to an element', function () {
            //TODO:
        });

    });

});


function isArray(value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
}