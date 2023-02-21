require('dotenv').config();

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const ExternalRemotesPlugin = require('external-remotes-plugin');

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
          oneOf: [
            {
              test: /\.tw\.css$/i,
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
                    postcssOptions: {
                      plugins: {
                        tailwindcss: {},
                        autoprefixer: {},
                        'postcss-prefixer': {
                          prefix: 'cr-',
                        },
                      },
                    },
                  },
                },
              ],
            },
            {
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
                    postcssOptions: {
                      plugins: {
                        tailwindcss: {},
                        autoprefixer: {},
                      },
                    },
                  },
                },
              ],
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
      new ExternalRemotesPlugin(),
      new ModuleFederationPlugin({
        name: 'career',
        exposes: {
          './career': './src/career',
          './plugin': './src/plugin',
        },
        filename: 'remoteEntry.js',
        remotes: {
          marketing: `marketing@[window.appUrls?.marketing]/remoteEntry.js`,
        },
        shared: {
          ...dependencies,
          '@mkeeorg/federation-ui': {
            singleton: true,
            requiredVersion: '*',
            version: '0',
          },
          react: {
            singleton: true,
            requiredVersion: '*',
            version: '0',
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '*',
            version: '0',
          },
          'react-query': {
            singleton: true,
            requiredVersion: '*',
            version: '0',
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        templateParameters: {
          marketingUrl:
            process.env.MARKETING_URL ||
            'https://federation-marketing-app.vercel.app',
        },
      }),
      new MiniCssExtractPlugin(
        isProd
          ? {
              filename: 'static/css/[name].[contenthash].css',
              chunkFilename: 'static/css/[name].[contenthash].css',
            }
          : {}
      ),
    ].filter(Boolean),
    optimization: {
      minimize: isProd,
      minimizer: ['...', new CssMinimizerPlugin()],
    },
  };
};
