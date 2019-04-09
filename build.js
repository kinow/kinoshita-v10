var uglify_js = require('uglify-js');
var clean_css = require('clean-css');

var fs = require('fs');

rm('-rf', 'assets/*.min.js');
rm('-rf', 'assets/*.min.css');

// TBD if fonts are added
// cp('-f', 'node_modules/font-mfizz/dist/font-mfizz.eot', 'static/assets/');
// cp('-f', 'node_modules/font-mfizz/dist/font-mfizz.svg', 'static/assets/');
// cp('-f', 'node_modules/font-mfizz/dist/font-mfizz.ttf', 'static/assets/');
// cp('-f', 'node_modules/font-mfizz/dist/font-mfizz.woff', 'static/assets/');


