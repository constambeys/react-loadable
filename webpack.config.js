const path = require('path');
const { ReactLoadablePlugin } = require('./lib/webpack');

module.exports = {
  entry: {
    main: './example/client',
  },
  output: {
    path: path.join(__dirname, 'example', 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['es2015', { modules: false }],
              'react',
            ],
            plugins: [
              'syntax-dynamic-import',
              'transform-class-properties',
              'transform-object-assign',
              require.resolve('./lib/babel'),
            ],
          }
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'react-loadable': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new ReactLoadablePlugin({
      filename:  path.resolve(__dirname, 'example', 'dist', 'react-loadable.json'),
    }),
  ]
};
