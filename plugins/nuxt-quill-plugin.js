/*
 * @Description: 富文本编辑器
 * @Author: chenchen
 * @Date: 2019-05-07 09:48:04
 * @LastEditTime: 2019-05-07 11:40:53
 */
import Vue from 'vue'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
if (process.browser) {
// 加一个浏览器端判断，只在浏览器端才渲染就不会报错了
  const VueQuillEditor = require('vue-quill-editor/dist/ssr')
  Vue.use(VueQuillEditor)
}