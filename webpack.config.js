const path = require('path');


var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlus     = require('html-webpack-plugin');
//获取html-webpack-plugin参数的通用方法
var getHtmlConfig       = function(name, title){
    return {
        template    : './src/view/'+name+'.html',
        filename    : 'view/'+name+'.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common',name]
    }
}

var WEBPACK_ENV         = process.env.WEBPACK_DEV || 'dev';

var config = {
    entry: { 
        'common' : ['./src/js/page/common/index.js'],
        'index' : ['./src/js/page/index/index.js'],
        'login' : ['./src/js/page/login/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/dist',
        filename: 'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'  //引用的是index.html上引入的jQuery，可以给其他地方的js文件通过require('jquery')的方式引入使用
    },
    module:{
        loaders:[
            {test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            {test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/ , loader:'url-loader?limit=100&name=resource/[name].[ext]'}
        ]         
    },
    plugins: [
        //独立通用模块打包
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
             filename: "js/base.js",
            // (给 chunk 一个不同的名字)
        
            minChunks: Infinity,
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
          }),
          //css独立打包，需要module中的loader配合修改
        new ExtractTextPlugin('[name].css'),
        //html模版处理
        new HtmlWebpackPlus(getHtmlConfig('index','首页')),
        new HtmlWebpackPlus(getHtmlConfig('login','登录'))
      ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}
module.exports = config;