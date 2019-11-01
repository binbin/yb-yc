
var Promise = require("bluebird");


var $ = require('jquery');

var stringifyJSON = require('../tools/stringifyJSON.js')
// var stringifyJSON=(a)=>a

var async = require('async');

var loadingtools = require('../tools/loading.js')

// var cztools = require('../cztools/cztools.js')

var default_const = require('../tools/default_const.js')
var tools = require('../tools/tools.js')

// var userService = require('../service/user.js')
var buildDom = require('../service/buildDom.js')

var dict = require('../config/dict.js')

var fecha = require('fecha')



/*
*个人参保信息查询
*
*/


var html = '<div role=tabpanel class=tab-pane id=plsh><div class="tabpanel_item active"><div class=change-type-box><label class=radio-inline><input type=radio name=plsh_inlineRadioOptions4 value=BTG checked> 审核不通过</label><label class=radio-inline><input type=radio name=plsh_inlineRadioOptions4 value=TG> 审核通过</label></div><div class=oprate-title><span class="label label-info">请在每一行中输入"身份证号" 如：150404196505140023</span></div><div class=oprate-box><textarea class=form-control></textarea></div><div class=oprate-button-box><button type=button class="btn btn-info pull-right"><span class="glyphicon glyphicon-hand-right"></span> 开始查询</button></div></div><div class=tabpanel_item><div class=oprate-title><span class="label label-info">处理结果:</span></div><div class="oprate-box oprate-box-h"><table class="table table-result"><thead><tr><td>身份证号</td><td>姓名</td><td>人员类别</td><td>离退休状态</td><td>险种</td><td>出生时间</td><td>参加工作时间</td><td>离退休时间</td></tr></thead><tbody></tbody></table></div><div class=oprate-button-box><button type=button class="btn btn-info"><span class="glyphicon glyphicon-hand-left"></span>返回上一步</button></div></div></div>'

buildDom(html);


module.exports = function () {
    var cx_type = $('#plsh input:radio:checked').val()
    $('#plsh input:radio').change(function () {
        cx_type = $('#plsh input:radio:checked').val()
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
                // if(!re_xid.test(line_value[0])){
                //   alert('解析失败,请检查身份证号码,第'+(i+1)+'行')
                //   return
                // }
                ids.push(line_value)
            }
            loadingtools.show()
            var progress = 0
            async.mapLimit(ids, 200, function (n, callback) {
                var data = {
                    cid: n[0].toUpperCase(),
                    cx_type: cx_type
                }
                userService.getUserMsg(data)
                    .then(function (data) {
                        // if (data['cx_type'] == 'CBXX') {
                        //     return Promise.resolve(data)
                        // } else if (data['cx_type'] == 'FFFS') {
                        //     if (data['tx_status'] == '离退休') {
                        //         return userService.getFFFS(data)
                        //     } else {
                        //         data['errorMsg'] = '人员未离退休'
                        //         return Promise.reject(data)
                        //     }
                        // } else if (data['cx_type'] == 'DYMX') {
                        //     if (data['tx_status'] == '离退休') {
                        //         return userService.getDYMX(data)
                        //     } else {
                        //         data['errorMsg'] = '人员未离退休'
                        //         return Promise.reject(data)
                        //     }
                        // } else if (data['cx_type'] == 'SHITONGJIAOFEI') {
                        //     return userService.getSTJFMsg(data)
                        // } else if (data['cx_type'] == 'CSXX') {
                        //     return userService.dycs1(data)
                        // } else if (data['cx_type'] == 'SZDWCX') {
                        //     var company_id = data['insurances'][0]['AC01_BAC142']
                        //     data['company_id'] = company_id
                        //     return companyService.getCompanyMoreMsgByID(data)
                        // }
                    })
                    .done(function (data) {

                        if (data['cx_type'] == 'DYMX') {
                            $.each(data['dymx'], function (i, item) {
                                if ($.inArray(item['AC61_BIC230'], dy_types) < 0) {
                                    dy_types.push(item['AC61_BIC230'])
                                }
                            })
                            // console.log(dy_types)
                        }

                        progress++
                        loadingtools.show('正在处理中(' + progress + '/' + ids.length + '),请稍候...')

                        callback(null, data)
                    }, function (data) {
                        progress++
                        loadingtools.show('正在处理中(' + progress + '/' + ids.length + '),请稍候...')

                        callback(null, data)
                        // alert(data)
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
                var thead = $('#plsh .tabpanel_item:last thead').empty()

                if (cx_type == 'CBXX') {
                    thead.html('<tr><th>身份证号</th><th>姓名</th><th>人员类别</th><th>人员级别</th><th>离退休状态</th><th>险种</th><th>出生时间</th><th>参加工作时间</th><th>离退休时间</th></tr>')
                    $.each(errorList, function (i, n) {
                        $('<tr><td>' + n['cid'] + '</td><td colspan="8">' + (n['user_name'] ? (n['user_name'] + ",") : "") + n['errorMsg'] + '</td></tr>').appendTo(tbody)
                    })
                    $.each(successList, function (i, n) {
                        var tr = $('<tr><td>' + n['cid'] + '</td><td>' + n['user_name'] + '</td><td>' + n['profession'] + '</td><td>' + n['level'] + '</td><td>' + n['tx_status'] + '</td></tr>')
                        $('<td>' + $.map(n['insurances'], function (item) {
                            return item['AC01_BAC143'] + '-' + dict['AAE140'][item['AC02_AAE140']] + '-' + dict['AAC008'][item['AC02_AAC008']]
                        }).join('<br>') + '</td>').appendTo(tr)
                        $('<td>' + (n['b_date'] ? fecha.format(new Date(n['b_date']), 'YYYY-MM-DD') : "有错误") + '</td>').appendTo(tr)
                        $('<td>' + (n['g_date'] ? fecha.format(new Date(n['g_date']), 'YYYY-MM-DD') : "有错误") + '</td>').appendTo(tr)
                        if (n['tx_status'] == '离退休') {
                            $('<td>' + (n['t_date'] ? fecha.format(new Date(n['t_date']), 'YYYY-MM-DD') : "有错误") + '</td>').appendTo(tr)
                        } else {
                            $('<td>未退休</td>').appendTo(tr)
                        }

                        tr.appendTo(tbody)
                    })
                } else if (cx_type == 'FFFS') {
                    thead.html('<tr><th>身份证号</th><th>姓名</th><th>离退休时间</th><th>发放状态</th><th>发放机构</th><th>银行帐号</th></tr>')
                    $.each(errorList, function (i, n) {
                        $('<tr><td>' + n['cid'] + '</td><td colspan="5">' + (n['user_name'] ? (n['user_name'] + ",") : "") + n['errorMsg'] + '</td></tr>').appendTo(tbody)
                    })
                    $.each(successList, function (i, n) {
                        var tr = $('<tr><td>' +
                            n['cid'] + '</td><td>'
                            + n['user_name'] + '</td><td>'
                            + n['AC01_AIC162'] + '</td><td>'
                            + dict['AAE116'][n['AC60_AAE116']] + '</td><td>'
                            + (dict['BAE419'][n['AC63_BAE419']] || n['AC63_BAE419']) + '</td><td>'
                            + n['AC63_AAE010'] + '</td></tr>')

                        tr.appendTo(tbody)
                    })
                } else if (cx_type == 'DYMX') {
                    dy_types = dy_types.sort(function (a, b) {
                        return parseInt(a, 10) - parseInt(b, 10)
                    })
                    thead.html('<tr><th>身份证号</th><th>姓名</th>'
                        + $.map(dy_types, function (item) {
                            return '<th>' + dict['BIC230'][item] + '</th>'
                        }).join('')
                        + '</tr>')
                    $.each(errorList, function (i, n) {
                        $('<tr><td>' + n['cid'] + '</td><td colspan="' + (dy_types.length || 1) + '">' + (n['user_name'] ? (n['user_name'] + ",") : "") + n['errorMsg'] + '</td></tr>').appendTo(tbody)
                    })
                    $.each(successList, function (i, n) {
                        var tr = $('<tr><td>' +
                            n['cid'] + '</td><td>'
                            + n['user_name'] + '</td>'
                            + $.map(dy_types, function (t) {
                                var mxs = $.grep(n['dymx'], function (v) {
                                    return v['AC61_BIC230'] == t
                                })
                                if (mxs.length > 0) {
                                    return '<td>' + mxs[0]['AC61_AIC263'] + '</td>'
                                } else {
                                    return '<td></td>'
                                }
                            }).join('')
                            + '</tr>')

                        tr.appendTo(tbody)
                    })

                } else if (cx_type == 'SHITONGJIAOFEI') {
                    thead.html('<tr><th>身份证号</th><th>姓名</th><th>视同缴费信息</th></tr>')
                    $.each(errorList, function (i, n) {
                        $('<tr><td>' + n['cid'] + '</td><td>' + (n['user_name'] ? (n['user_name'] + ",") : "") + n['errorMsg'] + '</td></tr>').appendTo(tbody)
                    })
                    $.each(successList, function (i, n) {
                        var tr = $('<tr><td>' +
                            n['cid'] + '</td><td>'
                            + n['user_name'] + '</td><td>'
                            + n['AC01_AIC162'] + '</td><td>'
                            + dict['AAE116'][n['AC60_AAE116']] + '</td><td>'
                            + (dict['BAE419'][n['AC63_BAE419']] || n['AC63_BAE419']) + '</td><td>'
                            + n['AC63_AAE010'] + '</td></tr>')
                        if (n['STJFMsg'].length == 0) {
                            $('<tr><td>' +
                                n['cid'] + '</td><td>'
                                + n['user_name'] + '</td><td>无视同缴费信息</td></tr>').appendTo(tbody)
                        } else {
                            $('<tr><td>' +
                                n['cid'] + '</td><td>'
                                + n['user_name'] + '</td><td>'
                                + $.map(n['STJFMsg'], function (item) {
                                    return item['AC10_AAE041'] + '-' + item['AC10_AAE042'] + '#' + dict['YANGLAOSHITONGJIAOFEINIANXIANLEIXING'][item['AC10_BAC020']]
                                }).join('<br/>')
                                + '</td></tr>').appendTo(tbody)
                        }
                    })
                } else if (cx_type == 'CSXX') {
                    thead.html('<tr><th>身份证号</th><th>姓名</th><th>改革时基本工资</th><th>改革时退休补贴</th><th>改革时增加的退休费</th><th>艰苦边远地区标准</th></tr>')
                    $.each(errorList, function (i, n) {
                        $('<tr><td>' + n['cid'] + '</td><td colspan="5">' + (n['user_name'] ? (n['user_name'] + ",") : "") + n['errorMsg'] + '</td></tr>').appendTo(tbody)
                    })
                    $.each(successList, function (i, n) {
                        var tr = $('<tr><td>' +
                            n['cid'] + '</td><td>'
                            + n['user_name'] + '</td><td>'
                            + n['dycs_parameters']['aac218'] + '</td><td>'
                            + n['dycs_parameters']['aac230'] + '</td><td>'
                            + n['dycs_parameters']['aac231'] + '</td><td>'
                            + n['dycs_parameters']['aie082'] + '</td></tr>')

                        tr.appendTo(tbody)
                    })
                } else if (cx_type == 'SZDWCX') {
                    thead.html('<tr><th>身份证号</th><th>姓名</th><th>单位编号</th><th>单位名称</th><th>艰苦边远地区类别</th></tr>')
                    $.each(errorList, function (i, n) {
                        $('<tr><td>' + n['cid'] + '</td><td colspan="4">' + (n['user_name'] ? (n['user_name'] + ",") : "") + n['errorMsg'] + '</td></tr>').appendTo(tbody)
                    })
                    $.each(successList, function (i, n) {
                        var tr = $('<tr><td>' +
                            n['cid'] + '</td><td>'
                            + n['user_name'] + '</td><td>'
                            + n['company_id'] + '</td><td>'
                            + n['company_name'] + '</td><td>'
                            + n['company_area_level'] + '</td></tr>')

                        tr.appendTo(tbody)
                    })
                }

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