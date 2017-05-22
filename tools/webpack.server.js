const path = require('path');
const projectRoot = path.resolve(__dirname, '..');
module.exports = {
    target: 'node', // !different
    entry: path.join(projectRoot, 'src/server-index.js'),
    output: {
        libraryTarget: 'commonjs2', // !different
        path: path.join(projectRoot, 'build'),
        filename: 'bundle.server.js',
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/,
            }
        ]
    },
}