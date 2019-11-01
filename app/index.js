var $ = require('jquery');

var importfile = require('./init/importfile.js');

var buildhtml = require('./init/buildhtml.js')

var roleTree = require('./config/role.js')

importfile()

buildhtml();


// [1,2,3].forEach((i)=>{alert(i)})

$(function () {
    var account, account_area, account_name
    var account_re = /\*\*15\d{6,8}\*\*/gi,
        area_re = /\*\*15\d{6}\*\*/gi

    var header_re = /\w+\*\*\*.+?\*\*\*\d+\*\*\*.+?\*\*\*\d+\*\*\*\d+\*\*\*\d+\*\*\*/gi

    if (typeof (SessionCatchValue1_ARR) === 'undefined' && !Array.prototype.isPrototypeOf(SessionCatchValue1_ARR)) {
        SessionCatchValue1_ARR = header_re.exec($('head').html())[0].split('***')
    }

    account = SessionCatchValue1_ARR[6]
    account_name = SessionCatchValue1_ARR[1]
    account_area = SessionCatchValue1_ARR[2]
    $('body').data('account', account)
    $('body').data('account_name', account_name)
    $('body').data('account_area', account_area)
    // alert(account_area)


    var config = require('./config/config.js')()
    var permissions = $('a.node font').map(function () { return $(this).text() })
    var define_permissions = config.permissions
    if (config.extra_permissions && config.extra_permissions[account]) {
        define_permissions = define_permissions.concat(config.extra_permissions[account])
    }

    var plugin_permissions = $.grep(define_permissions, function (item, i) {
        return $.grep(roleTree[item], function (x) {
            if (x.indexOf('||') > 0) {
                return $.grep(x.split('||'), function (xx) {
                    return $.inArray(xx, permissions) >= 0
                }).length == 0
            }
            return $.inArray(x, permissions) < 0
        }).length == 0 || (roleTree[item] && roleTree[item].length == 0)
    })
    $('.dialog_box .dashbord-link').each(function () {
        // $(this).parent().css('display','block')
        // return;
        if ($.inArray($(this).attr('for').replace('#', ''), plugin_permissions) >= 0) {
            $(this).parent().css('display', 'block')
        } else {
            $(this).parent().remove()
        }
    })

    //临时打开所有权限
    // $('.dialog_box .dashbord-link').parent().css('display','block')
    /*
    var config = require('../config.js')()


    $.ajax({
        type: 'GET',
        contentType: 'text/html',
        url: '/eapdomain/si/childmenu.do?parentName=1205206736504',
        cache: false,
        dataType: 'text'
    }).done(function (html) {
        var permissions = $(html).find('.ltdstyle a').map(function () { return $(this).text() }).get()

        var define_permissions = config.permissions
        if (config.extra_permissions && config.extra_permissions[account]) {
            define_permissions = define_permissions.concat(config.extra_permissions[account])
        }

        var plugin_permissions = $.grep(define_permissions, function (item, i) {
            return $.grep(roleTree[item], function (x) {
                if (x.indexOf('||') > 0) {
                    return $.grep(x.split('||'), function (xx) {
                        return $.inArray(xx, permissions) >= 0
                    }).length == 0
                }
                return $.inArray(x, permissions) < 0
            }).length == 0 || (roleTree[item] && roleTree[item].length == 0)
        })
        $('.dialog_box .dashbord-link').each(function () {
            // $(this).parent().css('display','block')
            // return;
            if ($.inArray($(this).attr('for').replace('#', ''), plugin_permissions) >= 0) {
                $(this).parent().css('display', 'block')
            } else {
                $(this).parent().remove()
            }
        })

        $('.qx').each(function () {
            if ($.inArray($(this).attr('role'), permissions) < 0) {
                $(this).remove()
            }
        })
        var define_qx_permissions = config.qx_permissions
        $('.qx').each(function () {
            if ($(this).attr('for') && $.inArray($(this).attr('for'), define_qx_permissions) < 0) {
                $(this).remove()
            }
        })

        $('.tab-pane').find('.qx input:enabled:first').prop('checked', true)

        $('.dashbord .row').each(function () {
            if ($(this).find('.role').size() == 0) {
                $(this).parent().remove()
            }
        })
    })
*/

    require('../app/model/gr_grcx')()
    require('../app/model/gr_grxg')()
    require('../app/model/gr_txxxbg')()
    require('../app/model/gr_dycs')()
    require('../app/model/fhywcl')()
    require('../app/model/cw_jjdz')()
    require('../app/model/dw_dwcx')()
    require('../app/model/jfbdy')()
    // require('./czheding.js')()
    // require('./czGRDZ.js')()
    // require('./czHZ.js')()
    // require('./czDWDZ.js')()

    
})

