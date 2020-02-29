const HtmlWebpackPlugin = require('html-webpack-plugin');          //解析html模板
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //主要是为了把css从JS抽出
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');        //主要是为了清除相同的js缓存

module.exports = {
  entry:{
    app: __dirname + '/src/app.js'            //入口文件
  },
  output:{
  	path: path.resolve(__dirname, 'dist'),    //__dirname，就是当前webpack.config.js文件所在的绝对路径
    filename : '[name].[hash].js'	            //输出文件(打包之后输出的文件名)[name]-[hash] 名称加随机名
  },
  //解析sass 和 css
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader",'sass-loader']
        })
      }
      // {
      //   test: /\.(audio)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: 'audio/[hash:8].[name].[ext]'
      //   }
      // }
    ]
  },
  //监听
  devServer:{
    port:9000,                                      //设置监听端口号
    open:false,                                     //自动打开浏览器，每次启动服务器会自动打开默认的浏览器
    hot:true,                                       //热更新
    inline:true,                                    //默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面
    contentBase: path.resolve(__dirname, "dist"),   //网站的根目录为 根目录/dist，这个路径一般与output.path一致
    index:'index.html',                             //与HtmlWebpackPlugin中配置filename一样
    compress:true                                   //对所有的服务器资源采用gzip压缩
  },
  //插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack配置',                    //index.html标题 <%= htmlWebpackPlugin.options.title %>
      template : './src/index.html',           //模板路径
      filename : 'index.html',                 //生成的页面路径
      inject : true,
      minify:{
        collapseWhitespace:true                //压缩html
      }
      // hash:true                             //js加随机名
  	}),
    new ExtractTextPlugin("styles.min.css"),   //抽离出的css
    new CleanWebpackPlugin(['dist/*'])　       //匹配删除缓存的文件
  ]
};
