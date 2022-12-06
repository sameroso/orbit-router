const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const dotEnv = require("dotenv");
const DefinePlugin = require("webpack").DefinePlugin;
const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: process.env.PUBLIC_PATH,
    path: path.resolve(__dirname, "./build"),
    filename: "static/js/bundle.[contenthash:8].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    clean: true,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      "process.env": JSON.stringify(dotEnv.config().parsed),
    }),
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        orbit: `orbit@${process.env.ORBIT_PATH}remoteEntry.js`,
        auth: `boilerplate@${process.env.BOILERPLATE_PATH}remoteEntry.js`,
      },
      exposes: {},
      shared: deps,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      publicPath: process.env.PUBLIC_PATH,
    }),
  ],
};
