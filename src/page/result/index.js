"use strict";

require('./index.css');
require('page/common/nav/index.js');
require('page/common/footer/index.js');

var _mm = require('util/mm.js');

//显示操作结果 
$(function () {
    var type = _mm.getUrlParam('type') || 'default',
        $el = $('.' + type + '-success');
    $el.show();
})