"use strict";

var $ = require('jquery');


require('./index.css');
require('page/common/nav/index.js');
require('page/common/footer/index.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);

    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
}

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //验证username是否存在
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            _this.checkUsername(username);
        });
        //点击注册按钮
        $('#submit').click(function () {
            _this.submit();
        });
        //密码输入框回车，也触发提交
        $('#password').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    checkUsername: function (username) {
        if (!username) {
            return;
        }
        _user.checkUsername(username, function (res) {
            formError.hide();
        }, function (errMsg) {
            formError.show(errMsg);
        });
    },
    //提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val())
        },
            validateResult = this.formValidate(formData);
        //验证成功
        if (validateResult.status) {
            _user.register(formData, function (res) {
                console.log(res);
                window.location.href = './result.html?type=register';
            }, function (errMsg) {
                console.log(errMsg);
                formError.show(errMsg);
            });
        }
        //验证失败
        else {
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单字段的验证
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };

        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if (formData.password.length < 6) {
            result.msg = "密码长度不能小于6位";
            return result;
        }
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式正确';
            return result;
        }
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式正确';
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}

$(function () {
    page.init();
});

// var login = function () {
//     console.log('hello login');
//     //$('div').css('background-color','orange');
//     $('.app').append("<div>hello login</div>");
// }

// module.exports = login;
