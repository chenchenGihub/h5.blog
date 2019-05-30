/*
 * @Description: 状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-05-29 20:01:02
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
    success: false
  },
  checknameState: {
    success: false
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

  
    state.userInfo = { ...defaultUserinfo }
  },
  user(state, payload){
   
    
  }
}

export const actions = {
  async register({
    commit
  }, params) {

  
   
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
   


    // const data = await this.$axios.$put('/api/logout', { id: state.userInfo._id });

    commit("logout", data)

  },
    
}
