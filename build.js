const uglify_js = require('uglify-js');
const clean_css = require('clean-css');

const fs = require('fs');
const shell = require('shelljs');

const now_date = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "")
;

shell.rm('-rf', 'assets/*.min.js');
shell.rm('-rf', 'assets/*.min.css');

const css_files = [];

const js_files = [];

// Source: https://github.com/jarrekk/Jalpc/blob/master/build/build.js

// compress js files function
function compress_js(pagename, filename, filelist) {
    console.log('Now compress ' + pagename + ' js files to ' + filename + ' ...');
    var result = uglify_js.minify(filelist, {
        mangle: true,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        },
    });

    fs.writeFileSync('static/assets/' + filename, result.code);
    console.log(pagename.green + " js files compress succeed. You can find it at \"static/assets\".\n".green);
}

// compress css files function
function compress_css(pagename, filename, filelist) {
    console.log('Now compress ' + pagename + ' css files to ' + filename + ' ...');
    var result = new clean_css().minify(filelist);
    var output = new clean_css({
        level: {
            1: {
                transform: function (propertyName, propertyValue) {
                    if (propertyName === 'src' && propertyValue.indexOf('node_modules/bootstrap/dist/') > -1) {
                        return propertyValue.replace('node_modules/bootstrap/dist/', '');
                    }
                    if (propertyName === 'src' && propertyValue.indexOf('node_modules/components-font-awesome/') > -1) {
                        return propertyValue.replace('node_modules/components-font-awesome/', '');
                    }
                    if (propertyName === 'src' && propertyValue.indexOf('node_modules/font-mfizz/dist/') > -1) {
                        return propertyValue.replace('node_modules/font-mfizz/dist/', '');
                    }
                    if (propertyName === 'background' && propertyValue.indexOf('static/img/') > -1) {
                        return propertyValue.replace('static/', '');
                    }
                    if (propertyName === 'background-image' && propertyValue.indexOf('static/img/') > -1) {
                        return propertyValue.replace('static/', '');
                    }
                }
            }
        }
    }).minify(result.styles);

    fs.writeFileSync('static/assets/' + filename, output.styles);
    console.log(pagename.green + " css files compress succeed. You can find it at \"static/assets\".\n".green);
}

// TBD if fonts are added
// cp('-f', 'node_modules/font-mfizz/dist/font-mfizz.eot', 'static/assets/');
// cp('-f', 'node_modules/font-mfizz/dist/font-mfizz.svg', 'static/assets/');
// cp('-f', 'node_modules/font-mfizz/dist/font-mfizz.ttf', 'static/assets/');
// cp('-f', 'node_modules/font-mfizz/dist/font-mfizz.woff', 'static/assets/');

for (let i = 0; i < css_files.length; i++) {
    if (css_files[i].type === 'css') {
        const filename = css_files[i].prefix + now_date + '.min.css';
        compress_css(css_files[i].name, filename, css_files[i].list);
    }
    if (js_files[i].type === 'js') {
        const filename = js_files[i].prefix + now_date + '.min.js';
        compress_js(js_files[i].name, filename, js_files[i].list);
    }
}


