
var import_css = function (link) {
    var css = document.createElement('link');
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", link);
    document.body.appendChild(css);
}

var loadjs = function (url, callback) {
    var elem = document.createElement('script');
    elem.setAttribute('defer', true)
    elem.setAttribute('type', 'text/javascript')
    elem.setAttribute('charset', 'UTF-8');
    elem.setAttribute('src', url);
    document.body.appendChild(elem)
    elem.onload = elem.onreadystatechange = function () {
        if (!elem.readyState || /complate|loaded/.test(elem.readyState)) {
            elem.onload = elem.onreadystatechange = null
            callback()
        }
    }
}

// var PRE='http://binbin.github.io/sto/build'

// var PRE='http://localhost'


//镜像地址
var PRE = window['PLUGIN_HOST'] ? window['PLUGIN_HOST'] : 'http://cf-sto.kingwuzhu.com'


module.exports = function () {

    // import_css('http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css')

    import_css(PRE + '/bootstrap/dist/css/bootstrap.min.css')
    import_css(PRE + '/bootstrap-slider/dist/css/bootstrap-slider.min.css')

    import_css(PRE + '/iconfont/iconfont.css')

    import_css(PRE + '/template.css?' + (+new Date))


}
