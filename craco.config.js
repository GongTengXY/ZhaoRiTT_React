const path = require('path')
const pxToViewport = require('postcss-px-to-viewport')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

const vw = pxToViewport({
  // 视口宽度，一般就是 375（ 设计稿一般采用二倍稿，宽度为 375 ）
  viewportWidth: 375,
})

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
      // 约定：使用 @scss 表示全局 SASS 样式所在路径
      // 在 SASS 中使用
      '@scss': path.resolve(__dirname, 'src/assets/styles'),
    },
    configure: (webpackConfig) => {
      // 修改webpack配置
      whenProd(() => {
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
          redux: 'Redux',
          'antd-mobile': 'antdMobile',
        }
        const { isFound, match } = getPlugin(
          webpackConfig,
          pluginByName('HtmlWebpackPlugin')
        )
        if (isFound) {
          match.userOptions.cdn = {
            js: [
              'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
              'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
              'https://cdn.jsdelivr.net/npm/redux@4.2.0/dist/redux.min.js',
              'https://cdn.jsdelivr.net/npm/antd-mobile@5.28.0/bundle/antd-mobile.compatible.umd.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js',
            ],
            CSS: [
              'https://cdn.jsdelivr.net/npm/antd-mobile@5.28.0/bundle/style.min.css',
            ],
          }
        }
      })

      return webpackConfig
    },
  },
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          // craco的写法现在只能在loaderOptions属性中写
          plugins: [vw],
        },
      },
    },
  },
  // 老版本才这样写
  // style: {
  //   postcss: {
  //     plugins: [vw],
  //   },
  // },
}
