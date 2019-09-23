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
    },
    updateTask(state, payload) {
      //Slight difference here because firestore doesn't return the update object.
      Vue.set(state.tasks, payload.id, payload.data)
    },
    deleteTask(state, id) {
      Vue.delete(state.tasks, id)
    },
  }
})