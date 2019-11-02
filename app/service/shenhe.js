const Promise = require("bluebird");
const $ = require('jquery');



const chushentongguo=(data)=>{
    let url = "/hctrade/productDeclarationYB/passAuditYB"
    return new Promise(function (resolve, reject) {
        let post_data = {
            keyId: data["id"]
        }
        $.ajax({
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            url: url,
            cache: false,
            data: post_data,
            dataType: "json"
        }).done(function (data1) {
            if (data1["msg"] && data1["msg"] == "操作成功") {
                resolve(data)
            } else {
                data["errorMsg"] = data1["msg"]||"初审通过操作失败"
                reject(data)
            }
        }).fail(function () {
            data['errorMsg'] = "初审通过操作出错"
            reject(data)
        })
    })
}
const chushenbutongguo = (data) => {
    let url = "/hctrade/productDeclarationYB/notPassAuditYB"
    return new Promise(function (resolve, reject) {
        let post_data = {
            keyId: data["id"],
            fcheckNoReson: data["reson"]
        }
        $.ajax({
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            url: url,
            cache: false,
            data: post_data,
            dataType: "json"
        }).done(function (data1) {
            if (data1["msg"] && data1["msg"] =="操作成功"){
                resolve(data)
            }else{
                data["errorMsg"] = data1["msg"] ||"初审不通过操作失败"
                reject(data)
            }
        }).fail(function () {
            data['errorMsg'] = "初审不通过操作出错"
            reject(data)
        })
    })
}

module.exports = { chushentongguo, chushenbutongguo}