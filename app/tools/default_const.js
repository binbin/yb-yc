

module.exports={
	re_pid : /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
	re_date : /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
	re_amount : /^[0-9]+(.[0-9]{1,2})?$/,
	re_range_amount : /^[1-2]+\d{3}(?:0[1-9]|1[0-2]|[1-9]{1})\-[1-2]+\d{3}(?:0[1-9]|1[0-2]|[1-9]{1})#(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
	re_range : /^[1-2]+\d{3}(?:0[1-9]|1[0-2]|[1-9]{1})\-[1-2]+\d{3}(?:0[1-9]|1[0-2]|[1-9]{1})$/,
	re_company_id:/^\d{6}\d+$/,
	re_month:/^[1-2]+\d{3}(?:0[1-9]|1[0-2]|[1-9]{1})$/,
	re_name: /^[\u4e00-\u9fa5]+$/,
	validate_bankno: function name(bankno) {
		var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

		var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
		var newArr = new Array();
		for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
			newArr.push(first15Num.substr(i, 1));
		}
		var arrJiShu = new Array();  //奇数位*2的积 <9
		var arrJiShu2 = new Array(); //奇数位*2的积 >9

		var arrOuShu = new Array();  //偶数位数组
		for (var j = 0; j < newArr.length; j++) {
			if ((j + 1) % 2 == 1) {//奇数位
				if (parseInt(newArr[j]) * 2 < 9)
					arrJiShu.push(parseInt(newArr[j]) * 2);
				else
					arrJiShu2.push(parseInt(newArr[j]) * 2);
			}
			else //偶数位
				arrOuShu.push(newArr[j]);
		}

		var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
		var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
		for (var h = 0; h < arrJiShu2.length; h++) {
			jishu_child1.push(parseInt(arrJiShu2[h]) % 10,10);
			jishu_child2.push(parseInt(arrJiShu2[h]) / 10, 10);
		}

		var sumJiShu = 0; //奇数位*2 < 9 的数组之和
		var sumOuShu = 0; //偶数位数组之和
		var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
		var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
		var sumTotal = 0;
		for (var m = 0; m < arrJiShu.length; m++) {
			sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
		}

		for (var n = 0; n < arrOuShu.length; n++) {
			sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
		}

		for (var p = 0; p < jishu_child1.length; p++) {
			sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
			sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
		}
		//计算总和
		sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

		//计算Luhm值
		var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
		var luhm = 10 - k;

		if (lastNum == luhm && lastNum.length != 0) {
			return true;
		}
		else {
			return false;
		}       
	},
	commons_types : {
		'21': 'AC01_SYZT',
		'31,32': 'AC01_YILZT',
		'51': 'AC01_SYEZT',
		'41': 'AC01_GSZT',
		'11': 'AC01_YLZT'
	},
	commons_types2 : {
		'AC01_SYZT': '21',
		'AC01_YILZT': '31,32',
		'AC01_SYEZT': '51',
		'AC01_GSZT': '41',
		'AC01_YLZT': '11'
	},
	commons_types3 : {
		'21':'失业保险',
		'31':'医疗保险',
		'51':'生育保险',
		'41':'工伤保险',
		'11':'企业基本养老保险'
	}
}