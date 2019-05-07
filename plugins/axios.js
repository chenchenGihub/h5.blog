/*
 * @Description: 集中配置http请求
 * @Author: chenchen
 * @Date: 2019-03-27 21:17:23
 * @LastEditTime: 2019-05-06 22:19:50
 */

export default function (ctx) {
   
    const { $axios, redirect,store } = ctx;

    $axios.onRequest(config => {

        config.headers.Authorization = sessionStorage.getItem('token') || '';
    
    });

    $axios.onResponse(response => {
       
       if (response.data && response.data.success===false) {

        console.log(response.data);
        
       
           if ( response.data.code===10004 || response.data.code===10005) {
           
               redirect('/');
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
