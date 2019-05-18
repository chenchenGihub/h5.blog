/*
 * @Description: 文章的状态管理
 * @Author: chenchen
 * @Date: 2019-03-28 19:55:16
 * @LastEditTime: 2019-05-11 11:35:50
 */
import Cookie from 'js-cookie';

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
  },
  toggleLikeRes:{
    success:false,
    isLike:false
  }
})

export const mutations = {
  getArticle(state, pl) {
  
    state.articelListRes.articelList = [...pl.data.articles];
    state.articelListRes.total = pl.data.total;
    state.articelListRes.success = pl.success;
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
  },
  togglelike(state,payload){
   
    state.toggleLikeRes.success=payload.success;
    state.toggleLikeRes.isLike=payload.data.isLike;

  }
}

export const actions = {
  async getArticle({
    commit
  }, params) {
    let data
    try {
      data = await this.$axios.$get('/api/article',params);
      commit('getArticle', data)
    } catch (error) {
     
    }
  },
  async publishArticle({ commit }, params) {

    
    params.id=Cookie.get("id")

    
    
    const data = await this.$axios.$post('/api/publishArticle',params)
    commit('publishArticle', data)
  },
  async getSingleArticle({ commit }, params) {
   
    
    const data = await this.$axios.$get('/api/getSingleArticle',{
      ...params,
      userId :JSON.parse(sessionStorage.getItem("user")).id
    })
    commit('getSingleArticle', data)
  },
  async togglelike({ commit }, params){
   
    const data = await this.$axios.$put('/api/togglelike',params)
    commit('togglelike', data)
  }
}
