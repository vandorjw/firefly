const store = new Vuex.Store({
  // strict: true,
  state: {
    user: null,
    tasks: {}
  },
  getters: {
    user: state => state.user,
    tasks: state => state.tasks
  },
  mutations: {
    login(state, payload) {
      state.user = payload
    },
    logout(state) {
      state.user = null
    },
    setTask(state, payload) {
      // https://github.com/vuejs/vuex/issues/654#issuecomment-282067306
      Vue.set(state.tasks, payload.id, payload.data())
    }
  }
})