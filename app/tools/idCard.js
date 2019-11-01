var $ = require('jquery');

function readCard(){	 	
	//SBNMJBTG-11395 兼容德卡T10读卡器 begin
	var idText = readIDCard();	
	//姓名0|身份证号码1|性别2|民族3|出生日期4|户口所在地5|最新住址6
	if(!idText){
    	return false;
    }
    var idTexts = "";
    idTexts = idText.split("|");
    var idName = idTexts[0];
    var CardNo = idTexts[1];
    var vSex = idTexts[2];
    var vNation = idTexts[3];
    var vBirth = idTexts[4];
    var vAddress = idTexts[5];
    var vNewAddress = idTexts[6];
    //SBNMJBTG-11395 兼容德卡T10读卡器 end
  
 	
 	var birthYear = vBirth.substring(0,4);
 	var birthMonth = vBirth.substring(4,6);
	var birthDay = vBirth.substring(6,8); 
    var _birthDate = new Date(birthYear,parseInt(birthMonth,10)-1,birthDay);
 	

    return {
    	CardNo:CardNo,
    	idName:idName,
        Nation:vNation
    }
 	//deleteIdCardInfo(); //20140508 comment by yang_feng 
}

//SBNMJBTG-11395 兼容德卡T10读卡器 begin
function readIDCard(){
  
	try{
 		var openStatus = idcard.OpenPort();
 		if(openStatus != "0"){
	    	alert("控件或设备连接失败，请检查是否连接正确设备。");
	 		return false;
	    }
 	}catch(err){
 		alert("控件或设备加载失败，请检查是否连接正确设备。");
		return false;
 	}
 	idcard.ClearAll();
 	var state = idcard.ReadCard();
 	if(state != "0"){
 		alert("读取身份证失败，请检查证件是否被正确放置，或拿起后重新放置。");
 		return false;
 	}
 	// var expriedTime = idcard.ActivityTo;
 	// var now = getdbtime().getTime();
 	// var date = new Date(now);
  //   var retV = "yyyyMMdd"

  //   now = unieap.dateFormatToString(date,retV); 	
 	// if(Number(expriedTime) - Number(now) < 0){
 	// 	messagebox("身份证超出有效期！");
 	// 	return false;
 	// }
 	var idName = $.trim(idcard.NameS);//获取证件姓名
 	var CardNo = idcard.CardNo;//获取证件号码
 	var vSex = idcard.Sex;//获取证件中性别
 	var vNation = idcard.Nation;//获取民族
 	var vBirth = idcard.Born;//获取出生日期
 	var vAddress = idcard.Address;//获取住址
    var vNewAddress = idcard.NewAddress;
    idcard.ClosePort();
    //姓名0|身份证号码1|性别2|民族3|出生日期4|户口所在地5|最新住址6
    return idName+"|"+CardNo+"|"+vSex+"|"+vNation+"|"+vBirth+"|"+vAddress+"|"+vNewAddress;
}

module.exports = {
    readCard:readCard
}