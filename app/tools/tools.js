var $ = require('jquery');

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
	},{
		begin:201801, end: 201812, amount: 5641
	}]
	var createRange= function(range,tax){
		range.begin=parseInt(range.begin,10)
		range.end=parseInt(range.end,10)
		var result=[],rax
		for(var i=0;i<hash.length;i++){
			if(hash[i].end<=199512){
				rax=1
			}else{
				rax=tax
			}
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
var uniqueRanges=(function(){
	function compare(a,b){
		return ((a.begin>=b.begin&&a.begin<=b.end) || (a.end>=b.begin&&a.end<=b.end))||((b.begin>=a.begin&&b.begin<=a.end) || (b.end>=a.begin&&b.end<=a.end))
	}
	return function(ranges){
		var array=[]
		ranges.sort(function(a,b){return a.begin-b.begin})
		for(var i=0;i<ranges.length-1;i++){
			if(compare(ranges[i],ranges[i+1])){
				return false
			}
		}
		return true
	}
})();
var createSingleRanges=(function(){
	// var hash=[{
	// 	begin:199801,
	// 	end:200012,
	// 	level:{'level60':'1111','level80':'1112','level100':'1113'}
	// },{
	// 	begin:200101,
	// 	end:200606,
	// 	level:{'level60':'1111','level80':'1112','level100':'1113','level200':'1114','level300':'1115'}
	// },{
	// 	begin:200607,
	// 	end:201512,
	// 	level:{'level60':'1111','level80':'1112','level100':'1113'}
	// },{
	// 	begin:201601,
	// 	end:201712,
	// 	level:{'level60':'61102','level80':'61103','level100':'61104','level200':'61106','level300':'61107'}
	// }]
	var getHash=function(rax){
		if(typeof(rax) == 'undefined'){
			rax=1
		}else{
			rax=parseFloat(rax)
		}

		if(rax==0.6){
			return [{
						begin:199801,
						end:201512,
						level:'1111'
					},{
						begin:201601,
						end:201712,
						level:'61102'
					}, {
						begin: 201801,
						end: 201812,
						level: '61102'
					}]
		}else if(rax==0.8){
			return [{
						begin:199801,
						end:201512,
						level:'1112'
					},{
						begin:201601,
						end:201712,
						level:'61103'
					}, {
						begin: 201801,
						end: 201812,
						level: '61103'
					}]
		}else if(rax==1){
			return [{
						begin:199801,
						end:201512,
						level:'1113'
					},{
						begin:201601,
						end:201712,
						level:'61104'
				}, {
					begin: 201801,
					end: 201812,
					level: '61104'
				}]
		}else if(rax==2){
			return [{
						begin:199801,
						end:200012,
						level:'1113'
					},{
						begin:200101,
						end:200606,
						level:'1114'
					},{
						begin:200607,
						end:201512,
						level:'1113'
					},{
						begin:201601,
						end:201712,
						level:'61106'
					}, {
						begin: 201801,
						end: 201812,
						level: '61106'
					}]
		}else if(rax==3){
			return [{
						begin:199801,
						end:200012,
						level:'1113'
					},{
						begin:200101,
						end:200606,
						level:'1115'
					},{
						begin:200607,
						end:201512,
						level:'1113'
					},{
						begin:201601,
						end:201712,
						level:'61107'
					}, {
						begin: 201801,
						end: 201812,
						level: '61107'
					}]
		}else{
			return [{
						begin:199801,
						end:201512,
						level:'1113'
					},{
						begin:201601,
						end:201712,
						level:'61104'
					}, {
						begin: 201801,
						end: 201812,
						level: '61104'
					}]
		}
	}
	var createRange= function(range){

		var hash=getHash(range['rax'])

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
					level:hash[i]['level']
				})//begin:199201,end:199206||9207 9308
			}else if(range.begin<=hash[i].begin&&range.end<=hash[i].end){
				result.push({
					begin:hash[i]['begin'].toString(),
					end:range.end.toString(),
					level:hash[i]['level']
				})
			}else if(range.begin>=hash[i].begin&&range.end>=hash[i].end){
				result.push({
					begin:range.begin.toString(),
					end:hash[i]['end'].toString(),
					level:hash[i]['level']
				})
			}else if(range.begin>=hash[i].begin&&range.end<=hash[i].end){
				result.push({
					begin:range.begin.toString(),
					end:range.end.toString(),
					level:hash[i]['level']
				})
			}
		}
		return result
	}
	return function(ranges){
		var result=[]
		for(var i=0;i<ranges.length;i++){
			result=result.concat(createRange(ranges[i])) 
		}
		return result
	}
})();

var makeMonthRange=function(start,end){
    var s=new Date(parseInt(start.substring(0,4),10),parseInt(start.substring(4,6),10)-1)
    var e=new Date(parseInt(end.substring(0,4),10),parseInt(end.substring(4,6),10)-1)
    var result=[]
    while(s<=e){
        var ms=s.getMonth()+1<10?'0'+(s.getMonth()+1):s.getMonth()+1
        result.push(s.getFullYear().toString()+ms)
        s.setMonth(s.getMonth()+1)
    }
    return result
};

var createMonthCuteRange=function(hasRanges,last){

	if(typeof(last)=='undefined'){
		last='201812'
	}

	hasRanges=hasRanges.sort(function(a,b){
        return parseInt(a,10)-parseInt(b,10)
    })

	var allRanges=makeMonthRange(hasRanges[0],last)

	var cuteRanges=$.grep(allRanges,function(n){return $.inArray(n,hasRanges)<0})
	allRanges=$.map(allRanges,function(n){
        return $.inArray(n,cuteRanges)>=0 ? n:'XXXXXX'
    })
    var result=[]
    for(var i=0;i<allRanges.length;i++){
        if(allRanges[i]!=='XXXXXX'){
            for(var j=i;j<allRanges.length;j++){
				if (j + 1 == allRanges.length || allRanges[j + 1] == 'XXXXXX' || allRanges[j + 1]=="201801"){
                    result.push({
                    	begin:allRanges[i],
                    	end:allRanges[j],
                    	s:allRanges[i]+'-'+allRanges[j]
                    })
                    i=j
                    break
                }
            }
        }
    }
    return result
}

var createMonthRange=function(hasRanges){


	hasRanges=hasRanges.sort(function(a,b){
        return parseInt(a,10)-parseInt(b,10)
    })

	var allRanges=makeMonthRange(hasRanges[0],hasRanges[hasRanges.length-1])

	var cuteRanges=$.grep(allRanges,function(n){return $.inArray(n,hasRanges)<0})
	allRanges=$.map(allRanges,function(n){
        return $.inArray(n,cuteRanges)>=0 ? 'XXXXXX':n
    })
    var result=[]
    for(var i=0;i<allRanges.length;i++){
        if(allRanges[i]!=='XXXXXX'){
            for(var j=i;j<allRanges.length;j++){
                if(j+1==allRanges.length||allRanges[j+1]=='XXXXXX'){
                    result.push({
                    	begin:allRanges[i],
                    	end:allRanges[j],
                    	s:allRanges[i]+'-'+allRanges[j]
                    })
                    i=j
                    break
                }
            }
        }
    }
    return result
}

var getInterest=function(base,start,end) {
	var rs={
		"1996":0.1,
		"1997":0.08,
		"1998":0.06,
		"1999":0.05,
		"2000":0.05,
		"2001":0.05,
		"2002": 0.05,
		"2003": 0.0198,
		"2004": 0.0225,
		"2005":0.0225,
		"2006":0.0252,
		"2007": 0.031,
		"2008":0.0412,
		"2009": 0.0225,
		"2010": 0.023,
		"2011": 0.05,
		"2012": 0.05,
		"2013": 0.05,
		"2014": 0.05,
		"2015": 0.05,
		"2016": 0.05,
		"2017": 0.05,
		"2018": 0.05
	}
	var current = new Date(start.valueOf()),rates=[]
	if(start.getFullYear()==end.getFullYear()){
		rates=[{
			month_count: end.getMonth() - start.getMonth() + 1,
			year: start.getFullYear(),
			rate: 1 + (((end.getMonth() + 1) / 12) * rs[current.getFullYear().toString()])
		}]//+1最后一个月计息
	}else{
		while (current.getFullYear() <= end.getFullYear()) {
			if (current.getFullYear() == end.getFullYear()) {
				rates.push({
					month_count: end.getMonth() + 1,
					year: current.getFullYear(),
					rate: 1 + (((end.getMonth() + 1) / 12) * rs[current.getFullYear().toString()])
				})//+1最后一个月计息
			}else if(current.getFullYear()==start.getFullYear()){
				rates.push({
					month_count: 12 - start.getMonth(),
					year: current.getFullYear(),
					rate: 1 + (((12 - start.getMonth()) / 12) * rs[current.getFullYear().toString()])
				})
			}else{
				rates.push({
					month_count: 12,
					year: current.getFullYear(),
					rate: 1 +  rs[current.getFullYear().toString()]
				})
			}
			current.setFullYear(current.getFullYear()+1)
		}
	}
	var r=0,result_Rate=1
	$.each(rates,function(i,item) {
		result_Rate*=item.rate
		// r += base *  (item.month_count / 12) * rs[item.year.toString()]
		// base = base * (1 + ((item.month_count / 12) * rs[item.year.toString()]))
	})
	return base * (result_Rate-1)
}

module.exports={
	createRanges:createRanges,
	uniqueRanges:uniqueRanges,
	createSingleRanges:createSingleRanges,
	createMonthCuteRange:createMonthCuteRange,
	createMonthRange:createMonthRange,
	getInterest: getInterest
}


