/*
 * @Description: 文章的状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-05-29 20:01:39
 */
import Cookies from 'js-cookie'

export const state = () => ({
  commentsRes: {
    success: false
  },
  commentListRes: {
    commentList: [],
    success: false
  },
  togglelikeRes: {
    success: false,
    isLike: false
  },
  togglecchildlikeRes: {
    success: false,
    isLike: false
  }
})

export const mutations = {
  comments(state, payload) {
    state.commentsRes.success = payload.success
  },
  commentlist(state, pl) {
    state.commentListRes.commentList = [...pl.data];
    state.commentListRes.success = true;
  },
  reply(state, pl) {
  

  },
  togglelike(state, pl) {
    state.togglelikeRes.success = pl.success;
    state.togglelikeRes.isLike = pl.data.isLike;
  },
  reloadTogglelike(state, pl) {
    state.commentListRes.commentList.find(v => v._id === pl.commentId).isLike = pl.isLike

    if (pl.isLike) {
      state.commentListRes.commentList.find(v => v._id === pl.commentId).votedCounts++
    } else {
      state.commentListRes.commentList.find(v => v._id === pl.commentId).votedCounts--
    }
  },
  togglecchildlike(state, pl) {
    state.togglecchildlikeRes.success = pl.success;
    state.togglecchildlikeRes.isLike = pl.data.isLike;

  },
  reloadCTogglelike(state, pl) {

    state.commentListRes.commentList.forEach(element => {

      if (element.children_comment.length > 0) {

        element.children_comment.find(v => v._id === pl.commentId).isLike = pl.isLike;

        if (pl.isLike) {
          (element.children_comment.find(v => v._id === pl.commentId)).votedCounts++
        } else {
          (element.children_comment.find(v => v._id === pl.commentId)).votedCounts--
        }
      }
      
    });

  }
}

export const actions = {
  async comments({
    commit
  }, params) {
    let data;
    try {
      data = await this.$axios.$post('/api/comment', params);
      commit('comments', data)
    } catch (error) {

    }
  },
  async commentlist({ commit }, params) {
    let data;
    try {
      data = await this.$axios.$get('/api/commentlist', { params });
      commit('commentlist', data)
    } catch (error) {

    }
  },
  async reply(state, params) {
    let data;

    let user = JSON.parse(sessionStorage.getItem("user"));
   

    params.userId = user.id;

    try {
      data = await this.$axios.$put('/api/reply', params);
      state.commit('reply', data)
    } catch (error) {

    }
  },
  async togglelike(state, params) {
    let data;
    params.userId = Cookies.get("id");

    try {
      data = await this.$axios.$put('/api/toggleclike', params);
      state.commit('togglelike', data)
    } catch (error) {

    }
  },
  async togglecchildlike(state, params) {
    let data

    try {
      data = await this.$axios.$put('/api/togglecchildlike', params);
      state.commit('togglecchildlike', data)
    } catch (error) {

    }
  }
}
