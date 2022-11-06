require('dotenv').config();

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

const pkgJson = require('./package.json');

const dependencies = pkgJson.dependencies;

const port = process.env.PORT || 8182;

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, { mode }) => {
  const isProd = mode === 'production';

  return {
    mode,
    output: {
      publicPath: 'auto',
      filename: isProd
        ? 'static/js/[name].[contenthash].js'
        : 'static/js/[name].js',
      chunkFilename: isProd
        ? 'static/js/[name].[contenthash].js'
        : 'static/js/[name].chunk.js',
      path: path.resolve(__dirname, 'dist'), // workaround for https://github.com/shellscape/webpack-manifest-plugin/issues/256
      clean: true,
    },

    resolve: {
      extensions: ['.jsx', '.js', '.json'],
    },

    devServer: {
      port: port,
      hot: false,
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
                modules: {
                  auto: true,
                  localIdentName: isProd
                    ? '[hash:base64]'
                    : '[path][name]__[local]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },

    devtool: isProd ? 'source-map' : 'cheap-module-source-map',

    plugins: [
      new ModuleFederationPlugin({
        name: 'career',
        exposes: {
          './career': './src/career',
        },
        filename: 'remoteEntry.js',
        remotes: {
          marketing: `marketing@${
            process.env.MARKETING_URL ||
            'https://federation-marketing-app.vercel.app/'
          }/remoteEntry.js`,
        },
        shared: {
          ...dependencies,
          react: {
            singleton: true,
            requiredVersion: dependencies.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
          },
          'react-query': {
            singleton: true,
            requiredVersion: dependencies['react-query'],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin(),
    ].filter(Boolean),
    optimization: {
      minimize: isProd,
      minimizer: ['...', new CssMinimizerPlugin()],
    },
  };
};
