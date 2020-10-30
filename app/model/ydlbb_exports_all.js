
const Promise = require("bluebird");


const $ = require('jquery');

const stringifyJSON = require('../tools/stringifyJSON.js')
// const stringifyJSON=(a)=>a

const async = require('async');

const loadingtools = require('../tools/loading.js')

// const cztools = require('../cztools/cztools.js')

const default_const = require('../tools/default_const.js')
const tools = require('../tools/tools.js')

const _ = require('lodash');

const FileSaver = require('file-saver');
const fecha = require('fecha')

const parse_dict = [
    // { name: 'id', text: '主键ID' },

    { name: '_SIGNID', text: 'SIGNID' },
    { name: '_HOSPITALNAME', text: '医疗机构名称' },
    { name: '_WEIGHTCOUNT', text: '总包装约定量' },
    { name: '_WEIGHTAMOUNT', text: '总包装约定金额(元)' },
    { name: '_BATCHNAME', text: '项目批次' },
    { name: '_QUARTER', text: '申报季度' },
    {
        name: '_CHECKSTATUS', text: '审核状态', formatter: function (val) {
            if (val == '0') {
                return '未审核';
            }
            else if (val == '1') {
                return '审核通过';
            }
            else if (val == '2') {
                return '审核不通过';
            }
            else {
                return "";
            }
        }
    },
    {
        name: '_CHECKDATE', text: '审核时间', formatter: function (val) {
            return val == null ? "" : fecha.format(new Date(val), 'YYYY-MM-DD  HH:mm:ss');
        }
    },
    {
        name: '_YBSIGNSTATUS', text: '统筹区签章状态', formatter: function (val) {
            if (val == '0') {
                return '未签章';
            }
            else if (val == '1') {
                return '已签章';
            }
            else {
                return "";
            }
        }
    },
   

    { name: 'PRODUCTNAME', text: '药品名称' },
    { name: 'OUTLOOKC', text: '药品规格' },
    { name: 'DRUGID', text: '药品编号' },
    { name: 'DRUGNAME', text: '通用名' },
    { name: 'DRUGFORM', text: '剂型' },
    { name: 'DRUGSPEC', text: '规格' },
    { name: 'DRUGFACTOR', text: '转换系数' },
    { name: 'PREPARATIONUNIT', text: '最小制剂单位' },
    { name: 'DRUGUNIT', text: '最小包装单位' },
    { name: 'LISENCECODE', text: '批准文号' },
    { name: 'COMPANYNAME_TB', text: '投标企业' },
    { name: 'COMPANYNAME_SC', text: '生产企业' },
    { name: 'PRICE', text: '包装采购价格（元）' },
    { name: 'WEIGHTCOUNT', text: '包装约定量' },
    { name: 'WEIGHTAMOUNT', text: '包装约定金额（元）' },
    {
        name: 'SUBMITTIME', text: '申报时间', formatter: function (val) {
            return val == null ? "" : fecha.format(new Date(val), 'YYYY-MM-DD  HH:mm:ss');
        }
     },
]

const title_text = parse_dict.map(x => x.text).join(",")

const parseRows = (row) => {
    return row.map((r) => {
        return parse_dict.map(rt => {
            if (r[rt["name"]]) {
                _.isString(r[rt["name"]]) ? (r[rt["name"]] = r[rt["name"]].replace(/\"/g, "\'").replace(/\,/g, "，")) : null
                return rt["formatter"] ? rt["formatter"](r[rt["name"]]) : ("\"" + r[rt["name"]] + "\"")
            } else {
                return ""
            }
        }).join(",")
    }).join("\n")
}



module.exports = function () {
    $('#ydlbb_exports_all').click(function () {
        loadingtools.show("正在加载中...")
        '_columns=id%2C%E6%93%8D%E4%BD%9C%2ChospNameTb%2CproductId%2CproductName%2CsubmitStatus%2CcheckStatus%2CproductSpec%2CproductModel%2CproductPackUnit%2CproductPackMaterial%2CcompNameTb%2CcompNameSc%2CregCode%2CregName%2CpurchasePrice%2CpurchaseCount%2CpurchaseDttmStart%2CdeclareType%2CchargeType%2CchargeLevel%2CsubmitTime%2CsubmitStatus%2CccheckStatus%2CfcheckTime%2CfcheckNoReson%2CtcheckTime%2CtcheckNoReson%2ClcheckTime%2ClcheckNoReson&startWith=false&endWith=false&_search=false&nd=1572601479039&rows=20&page=1&sidx=&sord=asc'

        let post_data = {
            // _columns: ["id", "操作", "hospNameTb", "productId", "productName", "submitStatus", "checkStatus", "productSpec", "productModel", "productPackUnit", "productPackMaterial", "compNameTb", "compNameSc", "regCode", "regName", "purchasePrice", "purchaseCount", "purchaseDttmStart", "declareType", "chargeType", "chargeLevel", "submitTime", "submitStatus", "ccheckStatus", "fcheckTime", "fcheckNoReson", "tcheckTime", "tcheckNoReson", "lcheckTime", "lcheckNoReson"].join(","),
            // startWith: false,
            // endWith: false,
            _search: false,
            nd: (+new Date),
            rows: 20,
            page: 1,
            sidx: "",
            sord: "asc",
            checkStatus: 0
        }
        const url = "/HSNN/CM/Weight/Web/Controller/WeightReportController/QueryPilotReportList_YB.HSNN?HOSPITALNAME=&BATCHCODE=&QUARTER=&CHECKSTATUS=&PAGEINFO=1"
        const data = {}
        let progress = 0
        new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                url: url,
                cache: false,
                data: post_data,
                dataType: "json"
            }).then(function (data1) {
                loadingtools.show("已获取分页信息...")
                try {
                    if (data1["total"]) {
                        data["total"] = data1["total"]
                        data["pages"] = Array.from(Array(data1["total"]), (v, k) => k + 1);
                        // data["pages"] =data["pages"].slice(790)
                        resolve(data)
                    } else {
                        data["errorMsg"] = "获取分页信息出错1"
                        reject(data)
                    }
                } catch (e) {
                    data['errorMsg'] = "获取分页信息出错2"
                    reject(data)
                }
            }).fail(function () {
                data['errorMsg'] = "获取分页信息出错3"
                reject(data)
            })
        }).then(function (data) {
            return new Promise(function (resolveXXX, rejectXXX){
                async.mapLimit(data["pages"], 10, function (n, callback) {
                    let post_data = {
                        _search: false,
                        nd: (+new Date),
                        rows: 20,
                        page: n,
                        sidx: "",
                        sord: "asc",
                        checkStatus: 0
                    }
                    $.ajax({
                        type: 'POST',
                        contentType: 'application/x-www-form-urlencoded',
                        url: url,
                        cache: false,
                        data: post_data,
                        dataType: "json"
                    }).then(function (data1) {
                        progress++
                        loadingtools.show('正在处理中(' + progress + '/' + data["total"] + '),请稍候...')
                        try {
                            if (data1["rows"]) {
                                callback(null, data1["rows"])
                            } else {
                                callback(null, {
                                    errorMsg: "获取数据信息出错1,第" + n + "页"
                                })
                            }
                        } catch (e) {
                            callback(null, {
                                errorMsg: "获取数据信息出错2,第" + n + "页"
                            })
                        }
                    }).fail(function () {
                        callback(null, {
                            errorMsg: "获取数据信息出错3,第" + n + "页"
                        })
                    })
                }, function (err, result) {
                    let errorList = $.grep(result, function (n, i) {
                        return typeof (n['errorMsg']) != 'undefined'
                    })
                    errorList = $.map(errorList, function (n, i) {
                        return n['errorMsg']
                    })
                    if (errorList && errorList.length > 0) {
                        data['errorMsg'] = errorList.join(',')
                        // alert(data['errorMsg'])
                        rejectXXX(data)
                    } else {
                        let array=[]
                        result.forEach((x) =>array=array.concat(x))
                        resolveXXX(array)
                    }
                    // loadingtools.hide()
                })
            })
        }).then(function(array) {
            progress=1
            async.mapLimit(array, 10, function (n, callback) {
                for(let k in n){
                    n['_'+k]=n[k]
                }

                let url2 = `/HSNN/CM/Weight/Web/Controller/WeightReportController/QueryHosReporDetail.HSNN?PRODUCTNAME=&OUTLOOKC=&DRUGID=&DRUGNAME=&DRUGFORM=&DRUGSPEC=&PAGEINFO=1&signid=${n.SIGNID}`
                let post_data = {
                    // _columns: ["id", "操作", "hospNameTb", "productId", "productName", "submitStatus", "checkStatus", "productSpec", "productModel", "productPackUnit", "productPackMaterial", "compNameTb", "compNameSc", "regCode", "regName", "purchasePrice", "purchaseCount", "purchaseDttmStart", "declareType", "chargeType", "chargeLevel", "submitTime", "submitStatus", "ccheckStatus", "fcheckTime", "fcheckNoReson", "tcheckTime", "tcheckNoReson", "lcheckTime", "lcheckNoReson"].join(","),
                    // startWith: false,
                    // endWith: false,
                    _search: false,
                    nd: (+new Date),
                    // rows: 100,
                    // page: 1,
                    rows: 9999,
                    page: 1,
                    sidx: "",
                    sord: "asc"
                }
                $.ajax({
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    url: url2,
                    cache: false,
                    data: post_data,
                    dataType: "json"
                }).then(function (data1) {
                    progress++
                    loadingtools.show('正在处理中(' + progress + '/' + array.length + '),请稍候...')
                    try {
                        if (data1["rows"]) {
                            let r = data1["rows"].map(x => Object.assign({}, n, x))
                            // let r =$.map(data1['rows'],function(x) {
                            //     return $.extend({}, n, x)
                            // })
                            // console.log(n)
                            callback(null,r )
                        } else {
                            callback(null, {
                                errorMsg: "获取数据信息出错4,第" + n + "页"
                            })
                        }
                    } catch (e) {
                        callback(null, {
                            errorMsg: "获取数据信息出错5,第" + n + "页"
                        })
                    }
                }).fail(function () {
                    callback(null, {
                        errorMsg: "获取数据信息出错6,第" + n + "页"
                    })
                })
            }, function (err, result) {
                let errorList = $.grep(result, function (n, i) {
                    return typeof (n['errorMsg']) != 'undefined'
                })
                errorList = $.map(errorList, function (n, i) {
                    return n['errorMsg']
                })
                if (errorList && errorList.length > 0) {
                    data['errorMsg'] = errorList.join(',')
                    alert(data['errorMsg'])
                } else {
                    // console.log(result)
                    // console.log(_.flatten(result))


                    const exportContent = "\uFEFF";
                    const blob = new Blob([exportContent + title_text + "\n" + parseRows(_.flatten(result))], { type: "text/plain;charset=utf-8" });
                    // const blob = new Blob([exportContent + "标题,标题,标题\n1,2,3\n4,5,6"], { type: "text/plain;charset=utf-8" });
                    FileSaver.saveAs(blob, "exports.csv");

                    // resolve(data)
                }
                loadingtools.hide()
            })
            console.log(array)
        }, function (data) {
            alert(data['errorMsg'])
            loadingtools.hide()
        })

    })
}