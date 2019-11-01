
var Promise = require("bluebird");


var $ = require('jquery');

var stringifyJSON = require('../tools/stringifyJSON.js')
// var stringifyJSON=(a)=>a

var async = require('async');

var loadingtools = require('../tools/loading.js')

// var cztools = require('../cztools/cztools.js')

var default_const = require('../tools/default_const.js')
var tools = require('../tools/tools.js')

var FileSaver = require('file-saver');

module.exports = function (){
    $('#exports_all').click(function(){
        var exportContent = "\uFEFF";
        var blob = new Blob([exportContent + "标题,标题,标题\n1,2,3\n4,5,6"], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "exports.csv");

        alert('xxx')
    })
}