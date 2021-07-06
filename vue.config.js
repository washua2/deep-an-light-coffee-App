// 导入nodejs环境下的path模块
const path = require("path")
module.exports = {
    //设置公共路径
    publicPath: './',
    //设置devServer webpack 提供的http服务
    devServer: {
        // 在指定的dist目录开启http服务
        contentBase: path.resolve(__dirname, "dist"),
        // 端口
        port: 8080,
        // 自动打开浏览器
        open: true,
        host: '0.0.0.0',
    },
	
	  configureWebpack: {
    resolve:{
      extensions:[],
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }

}