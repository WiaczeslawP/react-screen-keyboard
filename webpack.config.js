var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./Keyboard.js",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'Keyboard.js',
    library: "DayPicker",
    libraryTarget: "var"
  },
  plugins: [
    new webpack.ProvidePlugin({
      '_': 'underscore',
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
    ]
  },
  externals: {
    "react": "React"
  }
};
