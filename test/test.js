/*global describe, it, before, after, expect, window:false, browser:true, expr:true */
//if executed with node
if (exports) {
    var fs = require('fs');
    var jsdom = require('jsdom');
    var html = fs.readFileSync('./test/index.html', 'utf-8');
    window = jsdom.jsdom(html).parentWindow;
    var chai = require('chai');
    var Onscroll = require('../');
}
var doc = window.document;
var expect = chai.expect;
var onscroll = new Onscroll({
    elements: doc.getElementsByClassName('scrollElement'),
    onScrollFunction: function(element) {
        if(element.classList) {
            element.classList.add('scrolledTo');
        }
    },
    threshold: window.innerHeight / 2,
    scrollTimeoutTick: 100
});

describe('onscroll', function () {
    'use strict';
    it('should be defined.', function () {
        expect(Onscroll).to.not.be.undefined;
    });

    it('should be a function.', function () {
        expect(Onscroll).to.be.a('function');
    });

    describe('_addToCheckCollection', function () {
        before(function(){
           onscroll._checkCollection = {};
        });
        it('should be an empty collection initially.', function () {
            expect(onscroll._checkCollection).to.be.a('object');
            expect(Object.keys(onscroll._checkCollection)).to.be.empty;
        });
        it('should add the first item correctly.', function () {
            onscroll._addToCheckCollection('10', 'first');
            expect((onscroll._checkCollection['10'])).to.be.an.instanceof(Array);
            expect(onscroll._checkCollection['10'][0]).to.equal('first');
            expect(Object.keys(onscroll._checkCollection)).to.have.length(1);
        });
        it('should add the second item correctly.', function () {
            onscroll._addToCheckCollection('10', 'second');
            expect(onscroll._checkCollection['10'][0]).to.equal('first');
            expect(onscroll._checkCollection['10'][1]).to.equal('second');
            expect(onscroll._checkCollection['10']).to.have.length(2);
            expect(Object.keys(onscroll._checkCollection)).to.have.length(1);
        });
        it('should add various items correctly.', function () {
            onscroll._addToCheckCollection('20', 'third');
            expect((onscroll._checkCollection['20'])).to.be.an.instanceof(Array);
            expect(Object.keys(onscroll._checkCollection)).to.have.length(2);
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
            expect(elements).to.be.an.instanceof(Array);
            expect(elements).to.be.empty;
        });
        it('should return an filled array when element matches.', function () {
            var elements = onscroll._checkPositionWithElements(10);
            expect(elements).to.be.an.instanceof(Array);
            expect(elements).to.have.length(2);
            expect(elements[0]).to.equal('first');
            expect(elements[1]).to.equal('second');
        });
        it('should remove elements from collection if they have matched.', function () {
            expect(onscroll._checkCollection[10]).to.be.null;
            expect(onscroll._checkCollection[20]).not.to.be.null;
            expect(onscroll._checkCollection[30]).not.to.be.null;
        });
        it('should match multiple positions entries.', function () {
            var elements = onscroll._checkPositionWithElements(31);
            expect(elements).to.have.length(2);
            expect(elements[0]).to.equal('third');
            expect(elements[1]).to.equal('fourth');
            expect(onscroll._checkCollection[20]).to.be.null;
            expect(onscroll._checkCollection[30]).to.be.null;
        });
        after(function(){
            onscroll._checkCollection = {};
        });
    });

    describe('add new elements to element set', function () {
        before(function() {
            onscroll.setElements(Array.prototype.slice.call(doc.getElementsByClassName('scrollElement')));
            onscroll._calculateElementPositions(onscroll.getElements());
        });
        var newElements = [doc.getElementById('elementToAdd'), doc.getElementById('elementToAdd')];
         it('add should add new elements to the elements set', function () {
             onscroll.add(newElements);
             var elements = onscroll.getElements();
             expect(elements).to.have.length(5);
         });
        it('add should add a single element to the elements set as well', function () {
            onscroll.add(doc.getElementById('elementToAdd'));
            var elements = onscroll.getElements();
            expect(elements).to.have.length(6);
        });
    });

    describe('update all element positions', function () {
        before(function() {
            //set elements an calculate their positions
            onscroll._checkCollection = {
                500: doc.getElementById('elementToAdd')
            };
        });
        it('clear existing collection', function () {
            onscroll.updateAllElementPositions();
            expect(onscroll._checkCollection['500']).to.be.undefined;
        });
    });

});


function isArray(value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
}
