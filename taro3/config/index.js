const path = require("path");
// https://taro-docs.jd.com/taro/docs/config-detail
const config = {
  projectName: "TARO3",
  date: "2021-4-20",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_PLAT.replace("test", "")}`,
  plugins: [],
  defineConstants: {
    TARO_PLAT: JSON.stringify(process.env.TARO_PLAT)
  },
  env: {
    TARO_PLAT: JSON.stringify(process.env.TARO_PLAT)
  },
  alias: {
    "~": path.resolve(__dirname, "..", ""),
    "@": path.resolve(__dirname, "..", "src")
  },
  sass: {
    resource: ["src/styles/index.scss"],
    projectDirectory: path.resolve(__dirname, "..")
  },
  copy: {
    patterns: [
      // {
      //   from: "src/static/tabBar",
      //   to: `dist/${process.env.TARO_PLAT.replace("test", "")}/static/tabBar`
      // }
    ],
    options: {}
  },
  framework: "react",
  mini: {
    enableSourceMap: false,
    // https://github.com/webpack-contrib/mini-css-extract-plugin#options
    miniCssExtractPluginOption: {
      ignoreOrder: true
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  }
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
