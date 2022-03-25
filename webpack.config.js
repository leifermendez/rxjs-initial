const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => ({
  entry: "./src/index.ts",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
});
