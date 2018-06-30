const path = require('path');

module.exports = {
    entry:path.resolve(__dirname, 'src/index.js'),
    output:{
        path:path.resolve(__dirname, '../server/public'),
        filename:'[name].bundle.js'
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