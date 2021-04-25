require('dotenv').config();

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');

const pkgJson = require('./package.json');

const dependencies = pkgJson.dependencies;

const mainUrl =
  process.env.MAIN_URL || 'https://federation-main-app.vercel.app';

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, { mode }) => {
  const publicPath = addTrailingSlash(
    process.env.VERCEL_URL ||
      process.env.PUBLIC_PATH ||
      (mode === 'development'
        ? 'http://localhost:8082/'
        : 'https://federation-career-app.vercel.app/')
  );

  console.log({ publicPath });

  return {
    mode,
    output: {
      publicPath,
      clean: true,
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'), // workaround for https://github.com/shellscape/webpack-manifest-plugin/issues/256
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
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: pkgJson.federations.name,
        filename: 'remoteEntry.[contenthash].js',
        remotes: {
          main: `malcolm@${mainUrl}/remoteEntry.js`,
        },
        exposes: pkgJson.federations.exposes,
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
      mode === 'production' && new OptimizeCssAssetsPlugin(),
      new WebpackManifestPlugin(),
    ].filter(Boolean),

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-query)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
  };
};

/**
 *
 * @param {string} str
 * @returns
 */
const addTrailingSlash = (str) => (str.endsWith('/') ? str : `${str}/`);
