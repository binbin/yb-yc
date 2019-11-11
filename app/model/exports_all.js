
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
    { name: 'id', text: '主键ID' },
    // {
    //     name: '操作', text: '操作',
    //     formatter: function (val) {
    //         var str = ""
    //         if (rowdata.submitStatus == '1' && (rowdata.checkStatus == '0' || rowdata.checkStatus == '6')) {
    //             str += "<a href='javascript:void(0)' onclick='toAuditProduct(\"" + rowdata.id + "\")'>审核</a>";
    //         }
    //         if (150400 != rowdata.areaId) {
    //             if (rowdata.areaId == '150781' || rowdata.areaId == '152501') {
    //                 str = "";
    //             }
    //         }
    //         str += "<a href='javascript:void(0)' onclick='toQueryAuditLogListDialog(\"" + rowdata.id + "\")'>审核日志</a>";
    //         return str;
    //     }
    // },
    { name: 'hospNameTb', text: '申报医院'},
    {
        name: 'productId', text: '产品编码'
        // ,
        // formatter: function (val) {
        //     return val
        //     // return "<a href='javascript:void(0)' onclick='toProductDeclareDetail(\"" + rowdata.id + "\")'>" + val + "</a>";
        // }
    },
    { name: 'productName', text: '产品名称'},
    {
        name: 'submitStatus', text: '提交状态', formatter: function (val) { return val == null ? "" : { "0": "未送审", "1": "已送审" }[val] }
    },
    {
        name: 'checkStatus',
        text: '审核状态',
        formatter: function (val) { return val == null ? "" : { "0": "未审核", "2": "初审通过", "3": "初审不通过", "5": "复审通过", "6": "复审不通过", "20": "终审不通过", "21": "终审通过" }[val] }
    },
    { name: 'productSpec', text: '规格'},
    { name: 'productModel', text: '型号'},
    { name: 'productPackUnit', text: '包装单位'},
    { name: 'productPackMaterial', text: '包装材质'},
    { name: 'compNameTb', text: '申报企业'},
    { name: 'compNameSc', text: '生产企业'},
    { name: 'regCode', text: '注册证号'},
    { name: 'regName', text: '注册证名称'},

    {
        name: 'regEndDttm', text: '注册证有效期至',
        formatter: function (val) {
            return val == null ? "" : fecha.format(new Date(val), 'YYYY-MM-DD  HH:mm:ss');
        } 
    },
    { name: 'regProduceMake', text: '结构与组成' },
    { name: 'regProduceRange', text: '适应症' },
    { name: 'sortId', text: '医用耗材分类编码' },
    { name: 'hospCode', text: '定点医疗机构编码' },
    { name: 'productIdYb', text: '医保产品编码' },
    { name: 'policyBasis', text: '政策依据' },
    { name: 'hospitalIdTb', text: 'hospitalIdTb' },

    { name: 'addUser', text: '填加人' },
    { name: 'lastUpdUser', text: '最后操作人' },
    {
        name: 'lastUpdDttm', text: '最后操作时间',
        formatter: function (val) {
            return val == null ? "" : fecha.format(new Date(val), 'YYYY-MM-DD  HH:mm:ss');
        }
    },


    { name: 'purchasePrice', text: '采购价格'},
    { name: 'purchaseCount', text: '采购数量'},
    {
        name: 'purchaseDttmStart', text: '采购时间',
        formatter: function (val) {
            return val 
        }
    },
    {
        name: 'declareType', text: '申报类型',
        formatter: function (val) {
            var array = { "0": "新增", "1": "变更" };
            return array[val];
        }
    },
    {
        name: 'chargeType', text: '收费类别',
        formatter: function (val) {
            var array = { "1": "特殊材料", "2": "普通材料" };
            return array[val];
        }
    },
    {
        name: 'chargeLevel', text: '收费项目等级',
        formatter: function (val) {
            var array = { "1": "甲类", "2": "乙类", "3": "丙类" };
            return array[val];
        }
    },
    {
        name: 'submitTime', text: '提交时间',
        formatter: function (val) {
            return val == null ? "" : fecha.format(new Date(val), 'YYYY-MM-DD  HH:mm:ss');
        }
    },
    { name: 'submitStatus', text: '提交状态', hidden: true, align: 'center' },
    { name: 'ccheckStatus', text: '审核状态', hidden: true, align: 'center' },
    {
        name: 'fcheckTime', text: '初审时间',
        formatter: function (val) {
            return val == null ? "" : fecha.format(new Date(val), 'YYYY-MM-DD  HH:mm:ss');
        }
    },
    {
        name: 'fcheckNoReson', text: '初审不通过原因',
        formatter: function (val) {
            return val == null ? "" : ("\"" + val + "\"");
        }
    },
    {
        name: 'tcheckTime', text: '复审时间',
        formatter: function (val) {
            return val == null ? "" : fecha.format(new Date(val), 'YYYY-MM-DD  HH:mm:ss');
        }
    },
    {
        name: 'tcheckNoReson', text: '复审不通过原因',
        formatter: function (val) {
            return val == null ? "" : "\"" + val + "\"";
        }
    },
    {
        name: 'lcheckTime', text: '终审时间',
        formatter: function (val) {
            return val == null ? "" : fecha.format(new Date(val), 'YYYY-MM-DD  HH:mm:ss');
        }
    },
    {
        name: 'lcheckNoReson', text: '终审不通过原因',
        formatter: function (val) {
            return val == null ? "" : "\"" + val + "\"";
        }
    }
]

const title_text = parse_dict.map(x=>x.text).join(",")

const parseRows=(row)=>{
    return row.map((r)=>{
        return parse_dict.map(rt=>{
            if(r[rt["name"]]){
                return rt["formatter"] ? rt["formatter"](r[rt["name"]].replace(/\"/g,"\'")) : ("\"" + r[rt["name"]] + "\"")
            }else{
                return ""
            }
        }).join(",")
    }).join("\n")
}



module.exports = function (){
    $('#exports_all').click(function(){
        loadingtools.show("正在加载中...")
        '_columns=id%2C%E6%93%8D%E4%BD%9C%2ChospNameTb%2CproductId%2CproductName%2CsubmitStatus%2CcheckStatus%2CproductSpec%2CproductModel%2CproductPackUnit%2CproductPackMaterial%2CcompNameTb%2CcompNameSc%2CregCode%2CregName%2CpurchasePrice%2CpurchaseCount%2CpurchaseDttmStart%2CdeclareType%2CchargeType%2CchargeLevel%2CsubmitTime%2CsubmitStatus%2CccheckStatus%2CfcheckTime%2CfcheckNoReson%2CtcheckTime%2CtcheckNoReson%2ClcheckTime%2ClcheckNoReson&startWith=false&endWith=false&_search=false&nd=1572601479039&rows=20&page=1&sidx=&sord=asc' 

        // const exportContent = "\uFEFF";
        // const blob = new Blob([exportContent + "标题,标题,标题\n1,2,3\n4,5,6"], { type: "text/plain;charset=utf-8" });
        // FileSaver.saveAs(blob, "exports.csv");
        let post_data={
            _columns: ["id", "操作", "hospNameTb", "productId", "productName", "submitStatus", "checkStatus", "productSpec", "productModel", "productPackUnit", "productPackMaterial", "compNameTb", "compNameSc", "regCode", "regName", "purchasePrice", "purchaseCount", "purchaseDttmStart", "declareType", "chargeType", "chargeLevel", "submitTime", "submitStatus", "ccheckStatus", "fcheckTime", "fcheckNoReson", "tcheckTime", "tcheckNoReson", "lcheckTime", "lcheckNoReson"].join(","),
            startWith: false,
            endWith: false,
            _search: false,
            nd: (+new Date),
            rows: 20,
            page: 1,
            sidx:"",
           sord: "asc"
        }
        const url ="/hctrade/productDeclarationYB/getproductDeclareListYB"
        const data = {}
        let progress = 0
        new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                url: url,
                cache: false,
                data: post_data,
                dataType:"json"
            }).done(function (data1) {
                loadingtools.show("已获取分页信息...")
                try {
                    if (data1["total"]){
                        data["total"] = data1["total"]
                        data["pages"] = Array.from(Array(data1["total"]), (v, k) => k + 1);
                        resolve(data)
                    }else{
                        data["errorMsg"] ="获取分页信息出错1"
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
        }).done(function(data) {
            async.mapLimit(data["pages"], 10, function (n, callback) {
                let post_data = {
                    _columns: ["id", "操作", "hospNameTb", "productId", "productName", "submitStatus", "checkStatus", "productSpec", "productModel", "productPackUnit", "productPackMaterial", "compNameTb", "compNameSc", "regCode", "regName", "purchasePrice", "purchaseCount", "purchaseDttmStart", "declareType", "chargeType", "chargeLevel", "submitTime", "submitStatus", "ccheckStatus", "fcheckTime", "fcheckNoReson", "tcheckTime", "tcheckNoReson", "lcheckTime", "lcheckNoReson"].join(","),
                    startWith: false,
                    endWith: false,
                    _search: false,
                    nd: (+new Date),
                    rows: 20,
                    page: n,
                    sidx: "",
                    sord: "asc"
                }
                $.ajax({
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    url: url,
                    cache: false,
                    data: post_data,
                    dataType: "json"
                }).done(function (data1) {
                    progress++
                    loadingtools.show('正在处理中(' + progress + '/' + data["total"] + '),请稍候...')
                    try {
                        if(data1["rows"]){
                            callback(null, data1["rows"])
                        }else{
                            callback(null, {
                                errorMsg: "获取数据信息出错1,第" + n + "页"
                            })
                        }
                    } catch (e) {
                        callback(null,{
                            errorMsg: "获取数据信息出错2,第"+n+"页"
                        })
                    }
                }).fail(function () {
                    callback(null, {
                        errorMsg: "获取数据信息出错3,第" + n + "页"
                    })
                })
            }, function (err, result){
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
        },function(data) {
                alert(data['errorMsg'])
                loadingtools.hide()
        })

    })
}