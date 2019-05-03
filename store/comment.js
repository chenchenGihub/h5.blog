/*
 * @Description: 文章的状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-04-28 00:58:55
 */


export const state = () => ({
  commentsRes: {
    success: false
  },
  commentListRes: {
    commentList: [],
    success: false
  }
})

export const mutations = {
  comments(state, payload) {

  },
  commentlist(state,pl){
    state.commentListRes.commentList = [...pl.data];
    state.commentListRes.success = true;
  },
  reply(state,pl){
    console.log(pl);
    
  }
}

export const actions = {
  async comments({
    commit
  }, params) {
    let data;

    params.userId = this.state.user.userInfo.id;

    try {
      data = await this.$axios.$post('/api/comment', params);
      commit('comments', data)
    } catch (error) {

    }
  },
  async commentlist({ commit }, params) {
    let data;
    try {
      data = await this.$axios.$get('/api/commentlist', {params});
      commit('commentlist', data)
    } catch (error) {

    }
  },
  async reply({ commit }, params) {
    let data;
    params.user = this.state.user.userInfo
    try {
      data = await this.$axios.$put('/api/reply', params);
      commit('reply', data)
    } catch (error) {

    }
  }
}
