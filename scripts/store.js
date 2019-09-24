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
    createTask(state, payload) {
      let task = new Task(state.user.uid);
      let document = task.create(payload);
      document.then(t => {
        Vue.set(state.tasks, t.id, t.data());
      })
    },
    getTask(state, id) {
      let task = new Task(state.user.uid);
      let document = task.get(id);
      document.then(t => {
        Vue.set(state.tasks, t.id, t.data());
      })
    },
    updateTask(state, payload) {
      let task = new Task(state.user.uid);
      let document = task.update(payload.id, payload.delta);
      document.then(t => {
        Vue.set(state.tasks, payload.id, payload.data);
      })

    },
    deleteTask(state, id) {
      let task = new Task(state.user.uid);
      task.delete(id);
      Vue.delete(state.tasks, id);
    }
  }
})