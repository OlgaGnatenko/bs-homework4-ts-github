const path = require("path");

module.exports = {
  entry: "./index",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  module: {
    rules: [
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         configFile: "./babel.config.js",
      //         cacheDirectory: true
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: "./babel.config.js",
              cacheDirectory: true
            }
          }
        ]
      },
      // {
      //   test: /\.js$/,
      //   use: ["source-map-loader"],
      //   enforce: "pre"
      // },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: "./babel.config.js",
              cacheDirectory: true
            }
          }
        ]
      },      
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: [".js", ".ts", ".json"] },
  // resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
  mode: "development",
  devServer: {
    inline: true
  },
  devtool: "source-map"
};
