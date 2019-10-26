"use strict";

var conf = {
    serverHost: "https://www.fastmock.site/mock/4106e0afc50df3e98e628934a99a3dde/api/"
};

var Hogan = require('hogan.js');

var _mm = {
    request: function (param) {
        console.log('request.....');
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                console.log("request success");
                //请求返回成功
                if ('0' === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //未登陆
                else if ('10' === res.status) {
                    console.log("request success doLogin");
                    _this.doLogin();
                }
                //请求返回失败
                else if ('1' === res.status) {
                    console.log("request success err");
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            err: function (err) {
                console.log("request err");
                typeof param.error === 'function' && param.error(err.statusText);
            }

        });
    },
    //获取服务器地址
    getServerUrl(path) {
        return conf.serverHost + path;
    },
    //获取Url参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substring(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模版
    renderHtml(htmlTempalte, data) {
        var template = Hogan.compile(htmlTempalte);
        var result = template.render(data);
        return result;
    },
    successTips(msg) {
        alert(msg || '操作成功');
    },
    errorTips(msg) {
        alert(smg || '出错！');
    },
    //字段的验证，支持非空、手机、邮箱的验证
    validate: function (value, type) {
        var value = $.trim(value);
        //非空验证
        if ('require' === type) {
            return !!value;
        }
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    goHome: function () {
        window.location.href = "./index.html";
    },
    //统一登录处理
    doLogin: function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    doRegister: function () {
        window.location.href = './register.html';
    }
};

module.exports = _mm;