/*
 * @Description: 状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-05-08 10:45:57
 */
import Cookie from 'js-cookie';
const defaultUserinfo = {
  success: false,
  avatarUrl: '',
  userName: '',
  id: '',
  errorTxt:''
}
export const state = () => ({
  registerState: {
    success: null
  },
  checknameState: {
    success: null
  },
  userInfo: defaultUserinfo
})

export const mutations = {
  register(state, text) {
    state.registerState.success = text.success
  },
  checkname(state, text) {

    state.checknameState.success = text.success
  },
  login(state, payload) {
    
    console.log(payload);

    state.userInfo.success = payload.success;
    if (state.userInfo.success) {
      state.userInfo.avatarUrl = payload.data.avatarUrl;
      state.userInfo.userName = payload.data.userName;
      state.userInfo.id = payload.data._id;
     
      Cookie.set('auth',payload.data.token);
      Cookie.set("id",payload.data._id)
      

    } else {
      state.userInfo = {
        ...defaultUserinfo,
        errorTxt:payload.msg
      }
    }

  },
  logout(state, payload) {

    console.log(payload);
    
    state.userInfo = { ...defaultUserinfo }
  },
  user(state, payload){
    console.log(payload);
    
  }
}

export const actions = {
  async register({
    commit
  }, params) {

    const ip = await this.$axios.$get("http://icanhazip.com");

    params.ip = ip;

    const data = await this.$axios.$put('/api/register', params);

    commit('register', data);

  },
  async checkname({
    commit
  }, q) {

    const data = await this.$axios.$get('/api/checkname', {
      params: q
    });

    commit("checkname", data);

  },
  async login({
    commit
  }, q) {

    const data = await this.$axios.$put('/api/login', q);



    commit("login", data);

  },
  async logout({
    commit, state
  }, payload) {
   
console.log(this);

    // const data = await this.$axios.$put('/api/logout', { id: state.userInfo._id });

    commit("logout", data)

  },
    // nuxtServerInit ({ commit }, ctx) {
     
    //   console.log(ctx);
      
    //     commit('user', ctx)
     
    // }
}
