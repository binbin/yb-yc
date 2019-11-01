var createRanges=(function(){
	var hash=[{
		begin:198610,end:198712,amount:101
	},{
		begin:198801,end:198812,amount:105
	},{
		begin:198901,end:198912,amount:126
	},{
		begin:199001,end:199012,amount:137
	},{
		begin:199101,end:199112,amount:149
	},{
		begin:199201,end:199212,amount:159
	},{
		begin:199301,end:199312,amount:185
	},{
		begin:199401,end:199412,amount:226
	},{
		begin:199501,end:199512,amount:285
	},{
		begin:199601,end:199612,amount:317
	},{
		begin:199701,end:199712,amount:360
	},{
		begin:199801,end:199812,amount:407
	},{
		begin:199901,end:199912,amount:391
	},{
		begin:200001,end:200012,amount:440.42
	},{
		begin:200101,end:200112,amount:478.42
	},{
		begin:200201,end:200306,amount:592
	},{
		begin:200307,end:200406,amount:700
	},{
		begin:200407,end:200506,amount:800
	},{
		begin:200507,end:200606,amount:906
	},{
		begin:200607,end:200706,amount:1050
	},{
		begin:200707,end:200806,amount:1249
	},{
		begin:200807,end:200906,amount:1522
	},{
		begin:200907,end:201006,amount:1842
	},{
		begin:201007,end:201012,amount:2285
	},{
		begin:201101,end:201112,amount:2610.09
	},{
		begin:201201,end:201212,amount:3223.34
	},{
		begin:201301,end:201312,amount:3710.92
	},{
		begin:201401,end:201412,amount:3979.25
	},{
		begin:201501,end:201512,amount:4346
	},{
		begin:201601,end:201612,amount:4822.5
	},{
		begin:201701,end:201712,amount:5166.17
	}]
	var createRange= function(range,rax){
		range.begin=parseInt(range.begin,10)
		range.end=parseInt(range.end,10)
		var result=[]
		for(var i=0;i<hash.length;i++){
			if(range.begin>hash[i].end||range.end<hash[i].begin){
				continue
			}else if(range.begin<=hash[i].begin&&range.end>=hash[i].end){
				result.push({
					begin:hash[i]['begin'].toString(),
					end:hash[i]['end'].toString(),
					amount:rax==1?hash[i]['amount']:(Math.ceil(parseFloat(hash[i]['amount'])*rax*100)/100).toString()
				})//begin:199201,end:199206||9207 9308
			}else if(range.begin<=hash[i].begin&&range.end<=hash[i].end){
				result.push({
					begin:hash[i]['begin'].toString(),
					end:range.end.toString(),
					amount:rax==1?hash[i]['amount']:(Math.ceil(parseFloat(hash[i]['amount'])*rax*100)/100).toString()
				})
			}else if(range.begin>=hash[i].begin&&range.end>=hash[i].end){
				result.push({
					begin:range.begin.toString(),
					end:hash[i]['end'].toString(),
					amount:rax==1?hash[i]['amount']:(Math.ceil(parseFloat(hash[i]['amount'])*rax*100)/100).toString()
				})
			}else if(range.begin>=hash[i].begin&&range.end<=hash[i].end){
				result.push({
					begin:range.begin.toString(),
					end:range.end.toString(),
					amount:rax==1?hash[i]['amount']:(Math.ceil(parseFloat(hash[i]['amount'])*rax*100)/100).toString()
				})
			}
		}
		return result
	}
	return function(ranges,rax){
		if(typeof(rax) == 'undefined'){
			rax=1
		}else{
			rax=parseFloat(rax)
		}
		var result=[]
		for(var i=0;i<ranges.length;i++){
			result=result.concat(createRange(ranges[i],rax)) 
		}
		return result
	}
})();
var compareRanges=(function(){
	function compare(a,b){
		return ((a.begin>=b.begin&&a.begin<=b.end) || (a.end>=b.begin&&a.end<=b.end))||((b.begin>=a.begin&&b.begin<=a.end) || (b.end>=a.begin&&b.end<=a.end))
	}
	return function(ranges){
		var array=[]
		ranges.sort(function(a,b){return a.begin-b.begin})
		for(var i=0;i<ranges.length-1;i++){
			if(compare(ranges[i],ranges[i+1])){
				return true
			}
		}
		return false
	}
})();

module.exports={
	createRanges:createRanges,
	compareRanges:compareRanges
}