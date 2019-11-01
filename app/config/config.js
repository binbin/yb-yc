var $ = require('jquery');

var config = {
    '150499': {//市本级
        'permissions': ['gr_grcx', 'gr_grxg', 'gr_txxxbg', 'fhywcl', 'cw_jjdz', 'dw_dwcx'],
        'extra_permissions': {
            'jgbx_sbj_nbb': ['gr_dycs', 'jfbdy'],
            'jgbx_sbj_zlz': ['gr_dycs', 'jfbdy'],
            'jgbx_sbj_bh': ['gr_dycs', 'jfbdy'],
            'cfs_zpf': ['jfbdy']
        }
    }
}
module.exports =function() {
    var account_area = $('body').data('account_area')
    return config[account_area]
}