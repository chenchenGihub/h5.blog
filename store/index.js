/*
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-03 16:54:34
 * @LastEditTime: 2019-05-06 09:03:57
 */
export const state = () => ({
  user: {}
})

export const mutations = {
  login(state, params) {
    state.user = params
  },
  user(state,pl){
    
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
   
    
   
      commit('user', 11)
   
  }
}
