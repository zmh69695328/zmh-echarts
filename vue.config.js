/* eslint-disable @typescript-eslint/no-var-requires */
const nested = require("postcss-nested");

module.exports = {
  outputDir: "demo",
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [nested()]
        }
      }
    }
  },
  chainWebpack: config => {
    config.entry("app").clear().add("./src/demo/main.ts");

    config.module
      .rule("svg")
      .clear()
      .test(/\.svg$/)
      .type("asset/source");

    config.plugin("define").tap(([options]) => [
      {
        ...options,
        __CSP__: "false"
      }
    ]);
  },
  devServer: {
    allowedHosts: "all",
    port:8082,
    client: {
      webSocketURL: 'ws://47.116.4.8:18082/ws',
    },
  }
};
