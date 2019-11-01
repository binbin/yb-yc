var $ = require('jquery');

var importfile = require('./init/importfile.js');

var buildhtml = require('./init/buildhtml.js')

var roleTree = require('./config/role.js')

importfile()

buildhtml();


// [1,2,3].forEach((i)=>{alert(i)})

$(function () {
    $('.dialog_box .dashbord-link').parent().css('display', 'block')

    
    // var account, account_area, account_name
    // var account_re = /\*\*15\d{6,8}\*\*/gi,
    //     area_re = /\*\*15\d{6}\*\*/gi

    // var header_re = /\w+\*\*\*.+?\*\*\*\d+\*\*\*.+?\*\*\*\d+\*\*\*\d+\*\*\*\d+\*\*\*/gi

    // if (typeof (SessionCatchValue1_ARR) === 'undefined' && !Array.prototype.isPrototypeOf(SessionCatchValue1_ARR)) {
    //     SessionCatchValue1_ARR = header_re.exec($('head').html())[0].split('***')
    // }

    // account = SessionCatchValue1_ARR[6]
    // account_name = SessionCatchValue1_ARR[1]
    // account_area = SessionCatchValue1_ARR[2]
    // $('body').data('account', account)
    // $('body').data('account_name', account_name)
    // $('body').data('account_area', account_area)
  


    // var config = require('./config/config.js')()
    // var permissions = $('a.node font').map(function () { return $(this).text() })
    // var define_permissions = config.permissions
    // if (config.extra_permissions && config.extra_permissions[account]) {
    //     define_permissions = define_permissions.concat(config.extra_permissions[account])
    // }

    // var plugin_permissions = $.grep(define_permissions, function (item, i) {
    //     return $.grep(roleTree[item], function (x) {
    //         if (x.indexOf('||') > 0) {
    //             return $.grep(x.split('||'), function (xx) {
    //                 return $.inArray(xx, permissions) >= 0
    //             }).length == 0
    //         }
    //         return $.inArray(x, permissions) < 0
    //     }).length == 0 || (roleTree[item] && roleTree[item].length == 0)
    // })
    // $('.dialog_box .dashbord-link').each(function () {
    //     if ($.inArray($(this).attr('for').replace('#', ''), plugin_permissions) >= 0) {
    //         $(this).parent().css('display', 'block')
    //     } else {
    //         $(this).parent().remove()
    //     }
    // })


    require('../app/model/exports_all')()
    // require('../app/model/gr_grxg')()


    
})

