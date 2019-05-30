/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-29 21:13:20
 * @LastEditTime: 2019-05-29 22:35:41
 */
import Vue from 'vue';
import io from 'socket.io-client'

const socket=io('ws://localhost:3000'); 

let main = {
    install(Vue) {
        Vue.prototype.$socket = socket// 变量的内容 后期可以在vue中 this->$api.xxx 使用
    }
}
Vue.use(main);

// // 这里是 为了在 asyncData 方法中使用
// export default ({ app }, inject) => {
//     // Set the function directly on the context.app object
//     app.$socket = socket // 名称
// };
