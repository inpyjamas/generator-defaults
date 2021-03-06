/* eslint-disable @typescript-eslint/no-var-requires */
const Webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

// eslint-disable-next-line no-undef
module.exports = merge(common, {
  mode: "development",
  // entry: "./src/assets/ts/index.ts",
  devtool: "inline-source-map",
  output: {
    chunkFilename: "[name].chunk.js"
  },
  watch: true,
  resolve: {
    extensions: [".tsx", ".ts"]
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
});
