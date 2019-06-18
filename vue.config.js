module.exports = {
  lintOnSave: false,
// baseUrl: '/ sub-path /',
  productionSourceMap: false,
  configureWebpack: {
// entry: ["babel-polyfill", "./src/main.js"]
  },
  devServer: {
    // open: process.platform === 'darwin',
    // host: '0.0.0.0',
    // port: 443, // CHANGE YOUR PORT HERE
    // https: true,
    // hotOnly: true,
  }
}



