const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge'),
    path = require('path'),
    babelCfg = require("./babel.config"),
    paths = {
        root: path.join(__dirname, '../'),
        app: path.join(__dirname, '../app/'),
        dist: path.join(__dirname, '../dist/')
    },
    gtm = require('./gtm');

module.exports = {
    resolve: {
        alias: {
            //cx: paths.root + 'node_modules/cx-core/src/',
            app: paths.app
            //uncomment the line below to alias cx-react to cx-preact or some other React replacement library
            //'cx-react': 'cx-preact',
        }
    },

    module: {
        loaders: [{
            test: /\.js$/,
            //add here any ES6 based library
            include: /[\\\/](app|cx|cx-react)[\\\/]/,
            loader: 'babel-loader',
            query: babelCfg
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'dirname/[contenthash].[ext]',
                },
              },
            ],
        }]
    },
    entry: {
        vendor: ['cx-react'],
        app: paths.app + 'index.js'
    },
    output: {
        path: paths.dist,
        filename: "[name].js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        }),
        new HtmlWebpackPlugin({
            template: paths.app + 'index.html',
            hash: true,
            gtmh: gtm.head,
            gtmb: gtm.body
        })
    ],

};


