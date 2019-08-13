const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  target: 'web',
  devtool: "source-map",

  context: resolve(path.join('src')),

  entry: {
    app: './app.ts',
    style: './sass/index.scss',
  },
  output: {
    path: resolve('public/public'),
    publicPath: '/public',
    filename: "[name].bundle.js",
  },
  
  resolve: {
    extensions: ['.scss', '.ts', '.tsx', '.es6', '.js', '.jsx', '.json', '.svg', '.woff2', '.png', '.html'],
    modules: [
      'src',
      'node_modules',
    ],
 },
};
