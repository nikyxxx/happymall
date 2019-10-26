"use strict";

//var login = require('../login/index.js');//这里在测试引入时，因为样式名称一样导致主体部分样式错乱.page-wrap
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
require('page/common/header/index.js')
var footer = require('page/common/footer/index.js')
var _mm = require('util/mm.js')
//require('../style.css')

//$('.app').append("<div>hello index</div>");
//login();

navSide.init({
    name: 'order-list'
});



//模版渲染
var html = "<div style='background:green;'>{{data}}</div>";
var data = { data: '我是从模版渲染生成的' };
$('.app').append(_mm.renderHtml(html, data));



//console.log("getUrlParam:");
//console.log(_mm.getUrlParam('name'));

_mm.request({
    url: 'https://www.fastmock.site/mock/4106e0afc50df3e98e628934a99a3dde/api/todo?name=dddd',
    success: function (data, msg) {
        console.log(data.name);
        //alert(data.name);
    },
    err: function (err) {
        console.log(err);
    }
});




