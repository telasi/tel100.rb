var fs = require('fs');
var UglifyJS = require("uglify-js");

var readFile = function(file) {
  // console.log(file);
  var text = fs.readFileSync(file).toString();
  var lines = text.split('\n');
  var newLines = [];
  var requireBlock = false;
  var commentBlock = false;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.indexOf('requires:') !== -1) { requireBlock = true; }
    // if (line.indexOf('/*') !== -1) { commentBlock = true; }
    if (!requireBlock && !commentBlock) { newLines.push(line); }
    if (line.indexOf('],') !== -1) { requireBlock = false; }
    // if (line.indexOf('*/') !== -1) { commentBlock = false; }
  }
  return newLines.join('\n').trim();
};

var readDirectory = function(path) {
  var files = fs.readdirSync(path);
  for(var i = 0; i < files.length; i++) {
    var stat = fs.statSync(path + '/' + files[i]);
    if (stat.isDirectory()) {
      readDirectory(path + '/' + files[i]);
    } else {
      allFiles.push(readFile(path + '/' + files[i]));
    }
  }
};

// //////////////////////////////////////////////////////////////

var allFiles = [];
readDirectory('./app');

var code = allFiles.join('\n\n');
var minCode = UglifyJS.minify(code, { fromString: true });
fs.writeFileSync('./tel100.js', minCode.code);

// console.log(code.length);
// console.log(minCode.code.length);
