const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인를 불러오기
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// 정적 파일 복사 플러그인
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProdMode = argv.mode === "production";

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "build/"),
      filename: "app.js",
      // 반드시 모드로 나눠 작성한다. 배포모드일시 레포지터리 이름이나 url을 적어주자
      publicPath: isProdMode ? "http://15.164.225.127/" : "/"
    },
    devServer: {
      port: 3000
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader"
          ]
        },
        // Webpack(웹팩)에서 Typescript(타입스크립트)를 사용하기 위해 js|jsx를 ts|tsx로 수정 후 ts-loader를 추가
        // ts-loader의 옵션은 성능 향상을 위해서
        {
          test: /\.(ts|tsx)$/,
          use: [
            "babel-loader",
            "ts-loader",
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          use: [
            "babel-loader"
          ],
          exclude: /node_modules/,
        },
        // 파일 로더
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
      }),
      // Typescript(타입스크립트)의 컴파일 속도 향상을 위한 플러그인을 설정
      new ForkTsCheckerWebpackPlugin()
      // 파일, 폴더 복사 플러그인
    ],
  }
}