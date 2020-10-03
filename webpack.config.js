require('dotenv').config();

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const regexEscape = require('regex-escape');

const dependencies = require('./package.json').dependencies;

const PACKAGES_TO_COMPILE = ['heroicons'];

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, { mode }) => {
  const publicPath =
    process.env.PUBLIC_PATH ||
    (mode === 'development'
      ? 'http://localhost:8082/'
      : 'https://federation-career-app.vercel.app/');

  const exposedName = process.env.EXPOSED_NAME || 'career';

  return {
    mode,
    output: {
      publicPath,
    },

    resolve: {
      extensions: ['.jsx', '.js', '.json'],
    },

    devServer: {
      port: 8082,
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: mode === 'development',
              },
            },
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 1 },
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
          exclude: (modulePath) =>
            /node_modules/.test(modulePath) &&
            // whitelist specific es6 module
            !new RegExp(
              `node_modules[\\\\/](${PACKAGES_TO_COMPILE.map((module) =>
                module.replace(/\//, path.sep)
              )
                .map(regexEscape)
                .join('|')})[\\\\/]`
            ).test(modulePath),
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: exposedName,
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
          './career': './src/career',
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
            requiredVersion: dependencies['react-dom'],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin(),
      mode === 'production' && new OptimizeCssAssetsPlugin(),
    ].filter(Boolean),
  };
};
