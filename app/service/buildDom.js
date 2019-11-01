var $ = require('jquery');

var dom=$('.dialog_box .tab-content')

module.exports = function(html){
	$(html).appendTo(dom)
}