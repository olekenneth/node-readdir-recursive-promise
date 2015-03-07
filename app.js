/* global require, module, console*/

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var File = function(name) {
    'use strict';
    this.name = name;
    this.size = 0;
    this.hidden = false;

    if (name.substr(0, 1) === '.') {
        this.hidden = true;
    }

    return this;
};

var Directory = function(path) {
    'use strict';
    this.name = '';
    this.path = path;
    this.files = [];
    this.length = 0;
    this.hidden = false;

    var dirArray = path.split('/');
    this.name = dirArray[dirArray.length - 1];

    if (this.name.substr(0, 1) === '.') {
        this.hidden = true;
    }

    return this;
};

var readDir = function(inputDir) {
    var dir = new Directory(inputDir);
    return fs.readdirAsync(inputDir)
        .map(function(fileName) {
            return fs.statAsync(inputDir + '/' + fileName)
                .then(function(stat) {
                    if (stat.isFile()) {
                        var file = new File(fileName);
                        file.size = stat.size;

                        return file;
                    }
                    if (stat.isDirectory()) {
                        return readDir(inputDir + '/' + fileName).then(function(directory) { return directory; });
                    }
                });
        })
        .map(function(files) {
            dir.length += 1;
            dir.files.push(files);
        })
        .then(function() {
            return dir;
        });
};

module.exports.readdirAsync = readDir;
module.exports.readdir = function(inputDir, success) {
    return readDir(inputDir)
        .then(function(result) {
            success(null, result);
        })
        .catch(success);
};
