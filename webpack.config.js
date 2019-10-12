const path = require('path');


var webpack = require('webpack');
var config = {
    entry: { 
        index : ['./src/js/page/index/index.js'],
        login : ['./src/js/page/login/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'  //引用的是index.html上引入的jQuery，可以给其他地方的js文件通过require('jquery')的方式引入使用
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: "commons",
           filename: "js/base.js",
          // (给 chunk 一个不同的名字)
      
          minChunks: Infinity,
          // (随着 entry chunk 越来越多，
          // 这个配置保证没其它的模块会打包进 vendor chunk)
        })
      ]
};

module.exports = config;