const path = require('path');
//path for index.js file creation
const buildPath = path.resolve(__dirname, 'client');
var config = {
  entry: [
          path.join(__dirname, '/client/route.jsx')
  ],

    output: {
        path: buildPath,
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8000
    },

    module: {
      loaders:  [
        {
          test: /\.jsx$/,
          loaders: 'babel-loader',
          exclude: [/node_modules/],
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules',
          include: /flexboxgrid/
        }
      ]
    }
}

module.exports = config;
