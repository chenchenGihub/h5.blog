/*
 * @Description: 集中配置http请求
 * @Author: chenchen
 * @Date: 2019-03-27 21:17:23
 * @LastEditTime: 2019-05-29 19:59:12
 */

import Cookie from 'js-cookie';

export default function (ctx) {

    const { $axios, redirect, store } = ctx;

  


    $axios.onRequest(config => {

        $axios.setToken(Cookie.get("auth") || '', 'Bearer')

        


    });

    $axios.onResponse(response => {

        if (response.data && response.data.success === false) {

           




            if (response.data.code === 10004 || response.data.code === 10005) {

                redirect('/login');
            }
        }

    });

    $axios.onRequestError(err => {

    });

    $axios.onResponseError(err => {

    });

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })

}
