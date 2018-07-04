const path = require('path');

module.exports = {
    entry:path.resolve(__dirname, 'src/index.js'),
    output:{
        path:path.resolve(__dirname, '../server/public'),
        filename:'[name].bundle.js'
    },
    devServer:{
        host:'localhost',
        port:80,
        historyApiFallback:true,
        contentBase:path.resolve(__dirname, 'public')
    },
    externals:{
        'socket.io':'io'
    },
    module: {
        rules: [{
            test:/\.js$/,
            exclude:/node_modules/,
            use:'babel-loader'
        },{
            test:/\.css$/,
            exclude:/node_modules/,
            use:['style-loader', 'css-loader']
        }]
    }
}