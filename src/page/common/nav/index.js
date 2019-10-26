"use strict"


require('./index.css');
var _mm = require('util/mm.js');

$('.js-login').click(function () {
    _mm.doLogin();
});

$('.js-register').click(function () {
    _mm.doRegister();
});