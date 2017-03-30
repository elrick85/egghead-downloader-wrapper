/**
 * Created by Zaur_Ismailov on 3/24/2017.
 */

var execFile = require('child_process').execFile;
var path = require("path");
var os = require("os");

var runCommand = function(args, cb) {
    var file = path.join(process.cwd(), "/node_modules/.bin/egghead-downloader.cmd");
    var options = {};
    var child = execFile(file, args, options, function(error, stdout, stderr) {
        cb && cb(error, stdout, stderr);
    });

    return child;
};

var createOutput = function(str) {
    var _str = str.toLowerCase().replace(/\W/g, "_");
    var p = path.join(os.tmpdir(), "/", _str);
    return p;
};

module.exports = {
    getHelp: function() {
        runCommand(["-h"]);
    },

    // wrapper.download("https://egghead.io/courses/learn-es6-ecmascript-2015", "Learn ES6 (ECMAScript 2015)");
    download: function(link, title, cb) {
        var outputDir = createOutput(title);

        var process = runCommand(["-c", "-f", link, outputDir], function(error, stdout, stderr) {
            //console.log("stderr", stderr);
            cb(error);
        });

        process.stdout.on("data", function(chunk) {
            //console.log("stdout/data", chunk);
            cb(null, chunk);
        })
    }
};
