/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
// const ExtraWatchWebpackPlugin = require("extra-watch-webpack-plugin");
// const spawn = require("child_process").spawn;
// const LiveReloadPlugin = require("webpack-livereload-plugin");
// const WebSocket = require("ws");
// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    // {
    //   apply: compiler => {
    //     compiler.hooks.afterEmit.tap("AfterEmitPlugin", _compilation => {
    //       const jekyllCommnad = spawn("bundle", ["exec", "jekyll", "build"], {
    //         cwd: process.cwd()
    //       });
    //       jekyllCommnad.stdout.on("data", data => {
    //         console.log(`stdout: ${data}`);
    //       });
    //       jekyllCommnad.stderr.on("data", data => {
    //         console.error(`stderr: ${data}`);
    //       });
    //       jekyllCommnad.on("close", code => {
    //         console.log(`child process exited with code ${code}`);
    //       });
    //       // console.log(compilation);
    //       // const ws = new WebSocket("ws://localhost:35729/livereload");
    //       // const handshake = {
    //       //   command: "hello",
    //       //   protocols: ["http://livereload.com/protocols/official-7"],
    //       //   serverName: "jekyll"
    //       // };
    //       // ws.on("error", err => {
    //       //   console.error(err);
    //       // });
    //       // ws.on("open", () => {
    //       //   ws.send(JSON.stringify(handshake));
    //       // });
    //       // ws.on("message", message => {
    //       //   console.log(message);
    //       //   ws.close();
    //       // });
    //     });
    //   }
    // }
  ],
  entry: ["./src/assets/ts/index.ts", "./src/assets/css/index.scss"],
  optimization: {
    splitChunks: {
      chunks: "all",
      name: true
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css",
              outputPath: "../css"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader?-url&sourceMap=true"
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                ctx: {
                  cssnano: process.env.NODE_ENV === "production" ? {} : false
                }
              }
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts"]
  },
  output: {
    path: path.resolve(__dirname, "../src/assets/js"),
    filename: "index.bundle.js"
  }
};
