
var Promise = require("bluebird");


var $ = require('jquery');

var stringifyJSON = require('../tools/stringifyJSON.js')
// var stringifyJSON=(a)=>a

var async = require('async');

var loadingtools = require('../tools/loading.js')

// var cztools = require('../cztools/cztools.js')

var default_const = require('../tools/default_const.js')
var tools = require('../tools/tools.js')

var shenhe = require('../service/shenhe.js')
var buildDom = require('../service/buildDom.js')

var dict = require('../config/dict.js')

var fecha = require('fecha')



/*
*个人参保信息查询
*
*/


var html = '<div role=tabpanel class=tab-pane id=plsh><div class="tabpanel_item active"><div class=change-type-box><label class=radio-inline><input type=radio name=plsh_inlineRadioOptions4 value=BTG checked> 审核不通过</label><label class=radio-inline><input type=radio name=plsh_inlineRadioOptions4 value=TG> 审核通过</label></div><div class=oprate-title><span class="label label-info">请在每一行中输入"需要操作的ID 审核不通过的理由" 如：PRODUCTDECLARE0000000000000000000001 属新增</span></div><div class=oprate-box><textarea class=form-control></textarea></div><div class=oprate-button-box><button type=button class="btn btn-info pull-right"><span class="glyphicon glyphicon-hand-right"></span> 开始查询</button></div></div><div class=tabpanel_item><div class=oprate-title><span class="label label-info">处理结果:</span></div><div class="oprate-box oprate-box-h"><table class="table table-result"><thead><tr><td>序号</td><td>ID</td><td>结果</td></tr></thead><tbody></tbody></table></div><div class=oprate-button-box><button type=button class="btn btn-info"><span class="glyphicon glyphicon-hand-left"></span>返回上一步</button></div></div></div>'

buildDom(html);

const re_id =/^PRODUCTDECLARE\d{22}$/


module.exports = function () {
    var cx_type = $('#plsh input:radio:checked').val()

    var label_info = $('#plsh .tabpanel_item:first .label-info')
    $('#plsh input:radio').change(function () {
        cx_type = $('#plsh input:radio:checked').val()
        if(cx_type=="BTG"){
            label_info.text('请在每一行中输入"需要操作的ID 审核不通过的理由" 如：PRODUCTDECLARE0000000000000000000001 属新增')
        }else{
            label_info.text('请在每一行中输入"需要操作的ID 审核不通过的理由" 如：PRODUCTDECLARE0000000000000000000001')
        }
    })
    $('#plsh .tabpanel_item:first button').click(function () {

        try {
            var dy_types = []

            var text = $.trim($('#plsh .tabpanel_item:first textarea').val())
            var temp_line = text.split('\n'), ids = []
            for (var i = 0; i < temp_line.length; i++) {
                if ($.trim(temp_line[i]) === '') {
                    continue;
                }
                var line_value = $.trim(temp_line[i]).split(/\s+/)
                if(!re_id.test(line_value[0])){
                  alert('解析失败,请检查ID,第'+(i+1)+'行')
                  return
                }
                if (cx_type == "BTG" && !line_value[1]){
                    alert('解析失败,请输入不通过原因,第' + (i + 1) + '行')
                    return
                }
                (function() {
                    let data = {
                        id: line_value[0],
                        cx_type: cx_type,
                        index_num: i
                    };
                    if (cx_type == "BTG"){
                        data["reson"] = line_value[1]
                    }
                    ids.push(data)
                })();
               
            }
            loadingtools.show()
            var progress = 0
            async.mapLimit(ids, 50, function (n,callback) {
                // var data = {
                //     id: n[0],
                //     cx_type: cx_type
                // }
                // if (cx_type == "BTG"){
                //     data["reson"] = n[1]
                // }
      
                Promise.resolve(n).then(function(data) {
                    if (data['cx_type'] == 'BTG') {
                        return shenhe.chushenbutongguo(data)
                    } else if (data['cx_type'] == 'TG') {
                        return shenhe.chushentongguo(data)
                    }
                })
                .done(function (data) {
                    progress++
                    loadingtools.show('正在处理中(' + progress + '/' + ids.length + '),请稍候...')
                    callback(null, data)
                }, function (data) {
                    progress++
                    loadingtools.show('正在处理中(' + progress + '/' + ids.length + '),请稍候...')
                    callback(null, data)
                })
            }, function (err, result) {
                var successList = $.grep(result, function (n, i) {
                    return typeof (n['errorMsg']) == 'undefined'
                })
                var errorList = $.grep(result, function (n, i) {
                    return typeof (n['errorMsg']) != 'undefined'
                })

                $('#plsh .tabpanel_item:last .oprate-title .label').text('成功查询' + successList.length + '条,' + '查询失败' + errorList.length + '条,列表如下:')
                var tbody = $('#plsh .tabpanel_item:last tbody').empty()

                $.each(errorList, function (i, n) {
                    $('<tr><td>' + n['index_num'] + '</td><td>' + n['id'] + '</td><td>' +n['errorMsg'] + '</td></tr>').appendTo(tbody)
                })


                $('#plsh .tabpanel_item:first').hide().next().show()

                loadingtools.hide()

            })
        } catch (e) {
            alert('解析失败,请检查输入')
            loadingtools.hide()
            return;
        }
    })
    $('#plsh .tabpanel_item:last button').click(function () {
        $('#plsh .tabpanel_item:last').hide().prev().show().find('textarea').val('').focus()
    })
}