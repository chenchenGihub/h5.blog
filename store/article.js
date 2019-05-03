/*
 * @Description: 文章的状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-04-23 16:23:38
 */
export const state = () => ({
  articelListRes: {
    articelList:[],
    total:0,
    success:false
  },
  publishArticleRes:{
    success:false
  },
  article:{
    title:'',
    html:'',
    content:'',
    avatarUrl:'',
    author:''
  }
})

export const mutations = {
  getArticle(state, pl) {
    state.articelListRes.articelList = [...pl.data.articles];
    state.articelListRes.total = pl.data.total;
    state.articelListRes.success = true;
  },
  publishArticle(state,payload){
    state.publishArticleRes.success = payload.success
  },
  getSingleArticle(state,payload){
    state.article.title = payload.data.title
    state.article.html = payload.data.html
    state.article.content = payload.data.text
    state.article.avatarUrl = payload.data.avatarUrl
    state.article.author = payload.data.author
  }
}

export const actions = {
  async getArticle({
    commit
  }, params) {
    let data
    try {
      data = await this.$axios.$get('/api/article',{
        params: params
      });
      commit('getArticle', data)
    } catch (error) {
     
    }
  },
  async publishArticle({ commit }, params) {
    const data = await this.$axios.$post('/api/publishArticle',params)
    commit('publishArticle', data)
  },
  async getSingleArticle({ commit }, params) {
    const data = await this.$axios.$get('/api/getSingleArticle',{params})
    commit('getSingleArticle', data)
  }
}
