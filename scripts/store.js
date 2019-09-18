const store = new Vuex.Store({
  // strict: true,
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    login(state, payload) {
      state.user = payload
    },
    logout(state) {
      state.user = null
    }
  }
})