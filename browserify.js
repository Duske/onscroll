/**
 * Created by dchabrowski on 17.04.15.
 */
'use strict';

var fs = require('fs');
var browserify = require('browserify');

if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
}

browserify({'debug': true, 'standalone': 'Onscroll'})
    .require('./index.js', {'entry': true})
    .bundle()
    .on('error', function(err) { console.log('Error : ' + err.message); })
    .pipe(fs.createWriteStream('dist/onscroll.js'));