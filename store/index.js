export const state = () => ({
  user: {}
})

export const mutations = {
  login(state, params) {
    state.user = params
  }
}
