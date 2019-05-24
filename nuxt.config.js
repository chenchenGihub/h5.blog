/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-02 19:47:28
 * @LastEditTime: 2019-05-24 21:30:37
 */
const pkg = require('./package');
var TransformModulesPlugin = require('webpack-transform-modules-plugin');

module.exports = {
  mode: 'universal',

  server: {
    port: 3000, // 定义 输出端口 ，默认为3000
    host:"localhost" // 定义 输出 ip
    },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
    'highlight.js/styles/xcode.css',
    '~/assets/css/dialog.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src:'~/plugins/cube.js',
      ssr: true
    },
    '~/plugins/axios',
    { src: '~plugins/nuxt-quill-plugin.js', ssr: true },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    // proxyHeaders: false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

      config.resolve.alias['cube-ui'] = 'cube-ui/lib';

      // config.plugins.push(new TransformModulesPlugin())
    }
  }
}
