var $ = require('jquery');

var loadingDom=$('.loading_plugin')
var loadingContentDom=$('.loading_plugin_content')



module.exports={
	show:function(contentDom){
		if(loadingDom.size()==0){
			loadingDom=$('.loading_plugin')
			loadingContentDom=$('.loading_plugin_content')
		}

		if(typeof(contentDom) == 'undefined'){
			loadingContentDom.html('正在处理中,请稍候...')
		}else if(typeof(contentDom) =='string'){
			loadingContentDom.html(contentDom)
		}else{
			loadingContentDom.append(contentDom)
		}
		loadingDom.show('slow')
	},
	hide:function(){
		if(loadingDom.size()==0){
			loadingDom=$('.loading_plugin')
			loadingContentDom=$('.loading_plugin_content')
		}
		
		loadingDom.hide('slow')
	}
}