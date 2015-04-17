/**
 * Created by dchabrowski on 17.04.15.
 */
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
    elements: doc.getElementsByClassName('scrollElement')
});

describe('onscroll', function () {

    it('should set doc title.', function () {
        assert(window.document.title === 'onscroll');
    });

    it('should be defined.', function () {
        assert(Onscroll !== undefined);
    });

    it('should be a function.', function () {
        assert(typeof Onscroll === 'function');
    });

    describe('_addToCheckCollection', function () {
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
    });


});


function isArray(value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
};