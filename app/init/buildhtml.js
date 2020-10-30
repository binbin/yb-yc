var $ = require('jquery');

var roleTree = require('../config/role.js')

// var deterRole = require('./deterRole.js')

module.exports = function () {
    $('<div class="minibar">+</div><div class="maskscreen"><div class="loading_plugin"><div class="loading_plugin_content">loading...</div></div><div class="dialog_box"><div class="home_btn">功能列表</div><div class="top_title">功能列表</div><div class="close_btn">最小化</div><div class="tab-content"><div role="tabpanel" class="tab-pane active" id="d0"><div class="tabpanel_item active" style="margin-top:20px"><div class="dashbord container-fluid"><div class="row"><div class="dashbord-label">药采审核:</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 role"><a class="dashbord-link" href="javascript:void(0)" id="exports_all"><i class="iconfont">&#xe6a5;</i><div>导出信息</div></a></div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 role"><a class="dashbord-link" href="javascript:void(0)" for="#plsh"><i class="iconfont">&#xe622;</i><div>批量审核</div></a></div></div><div class="row"><div class="dashbord-label">约定量补报:</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 role"><a class="dashbord-link" href="javascript:void(0)" id="ydlbb_exports_all"><i class="iconfont">&#xe6a5;</i><div>导出信息</div></a></div></div></div></div></div></div></div></div><div class="pb_print"></div>').appendTo('body')
    $('.dialog_box .close_btn').click(function () {
        $('.maskscreen').hide('slow')
        $('.minibar').show('slow')
    })
    $('.minibar').click(function () {
        $('.maskscreen').show('slow')
        $('.minibar').hide('slow')
    })







    // var loadingtools=require('../tools/loading.js')
    // $('.dialog_box .nav-tabs li').click(function(){



    // 	$(this).addClass('active').siblings().removeClass('active')
    // 	$('.dialog_box .tab-content .tab-pane').eq($(this).index()).addClass('active').siblings().removeClass('active')
    // })

    $(function () {
        $('#d0 a:not(#exports_all,#ydlbb_exports_all)').click(function () {
            // if($(this).attr('for')=='#dwdz'||$(this).attr('for')=='#grdz'||$(this).attr('for')=='#plhz'){
            // 	alert('自治区系统疑似改动,核实后下周恢复。')
            // 	return
            // }
            $('#d0').hide()
            $($(this).attr('for')).show()
            $('.home_btn').text('返回功能列表')
            $('.top_title').text($(this).find('div').text())
            $('.home_btn').show()
        })
        $('.home_btn').click(function () {
            if ($(this).text() === '返回功能列表') {
                $('.tab-pane').hide()
                $('#d0').show()
                $('.top_title').text('功能列表')
                $(this).hide()
            }
        })
    })
    // $(function () {
    //     dojo.stopEvent = $.noop
    // })
    // alert('test111')

    $(function () {
        $('.pb_print').dblclick(function () {
            $(this).hide().siblings().not('.loading,.loadingxhr,.minibar').show()
        })
    })
}