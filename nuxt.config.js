/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-02 19:47:28
 * @LastEditTime: 2019-05-16 23:22:11
 */
const pkg = require('./package');
var TransformModulesPlugin = require('webpack-transform-modules-plugin');

module.exports = {
  mode: 'universal',

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '@fortawesome/fontawesome-free/css/all.css',
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

      config.plugins.push(new TransformModulesPlugin())
    }
  }
}
