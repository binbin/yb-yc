const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = {
    // entry: ['babel-polyfill', './app/cz/index.js'] ,
    entry: ['./app/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'all.js'
    },
    devtool: "source-map",
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        // ignored: /node_modules/,//不监测
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:[{
                    loader:'es3ify-loader'
                },{
                    loader: 'babel-loader',
                    options:{
                        'presets': ["env","es2015-loose", "stage-0"]
                    }
                }], 
                include: [path.join(process.cwd(), 'app')],

            }, 
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // 编译顺序从右往左
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'] // 编译顺序从右往左
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: { // 这里的options选项参数可以定义多大的图片转换为base64
                        limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        outputPath: 'images' //定义输出的图片文件夹
                    }
                }]
            }
            // { test: /\.scss$/, loaders: ['style', 'css', 'sass'], include: path.join(process.cwd(), 'app/style') },
            // { test: /\.(jpg|png)$/, loader: 'url-loader?limit=8192', include: path.join(process.cwd(), 'app/img') }
        ]
    }, 
    plugins: [
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'src/iconfont/*'), to: path.resolve(__dirname, 'build/'), force: true, context: 'src/'},
            { from: path.resolve(__dirname, 'src/*.css'), to: path.resolve(__dirname, 'build/'), context: 'src/'}
        ], {})
    ],
    //压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        properties: true,
                        warnings: false
                    },
                    output: {
                        beautify: false,
                        quote_keys: false
                    },
                    sourceMap: false,
                    ie8: true,
                }
            })
        ]
    },
    performance: {
        hints: false
    }
};