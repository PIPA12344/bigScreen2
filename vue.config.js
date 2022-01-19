module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  devServer: {
    //使用代理进行解决跨域的问题
    proxy: {
      '/api': {
        target: 'http://115.238.49.237:9091',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

}
