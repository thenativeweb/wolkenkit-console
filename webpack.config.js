const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      processenv = require('processenv'),
      webpack = require('webpack');

const nodeEnv = processenv('NODE_ENV');

const paths = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const getEnvironmentVariables = function () {
  return {
    'process.env.NODE_ENV': JSON.stringify(nodeEnv)
  };
};

const getPluginsFor = function (environment) {
  switch (environment) {
    case 'production':
      return [
        new webpack.DefinePlugin(getEnvironmentVariables()),
        new CompressionPlugin({
          test: /\.(js|html)$/,
          filename: '[path].gz[query]',
          algorithm: 'gzip'
        }),
        new HtmlWebpackPlugin({
          template: path.join(paths.src, 'template.ejs'),
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true
          }
        })
      ];
    default:
      return [
        new webpack.DefinePlugin(getEnvironmentVariables()),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: path.join(paths.src, 'template.ejs')
        })
      ];
  }
};

const configuration = {
  mode: nodeEnv || 'development',
  devtool: nodeEnv !== 'production' ? 'source-map' : false,
  context: paths.src,
  devServer: {
    contentBase: paths.src,
    compress: true,
    host: 'local.wolkenkit.io',
    port: 8080
  },
  entry: [
    './index.js'
  ],
  output: {
    path: paths.build,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          paths.src
        ],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(svg|jpe?g|png|gif|ico)$/i,
        use: [
          { loader: 'file-loader' }
        ]
      }
    ]
  },
  plugins: getPluginsFor(nodeEnv)
};

module.exports = configuration;
