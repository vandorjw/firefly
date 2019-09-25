const store = new Vuex.Store({
  // strict: true,
  state: {
    user: null,
    tasks: {},
    blogs: {}
  },
  getters: {
    user: state => state.user,
    tasks: state => state.tasks,
    blogs: state => state.blogs
  },
  mutations: {
    login(state, payload) {
      state.user = payload
    },
    logout(state) {
      state.user = null,
      state.tasks = null
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
    },
    // ========= BLOG ==== //
    createBlog(state, payload) {
      let blog = new Blog();
      let document = blog.create(payload);
      document.then(t => {
        Vue.set(state.blogs, t.id, t.data());
      })
    },
    getBlog(state, id) {
      let blog = new Blog();
      let document = blog.get(id);
      document.then(t => {
        Vue.set(state.blogs, t.id, t.data());
      })
    },
    updateBlog(state, payload) {
      let blog = new Blog();
      let document = blog.update(payload.id, payload.delta);
      document.then(t => {
        Vue.set(state.blogs, payload.id, payload.data);
      })
    },
    deleteBlog(state, id) {
      let blog = new Blog();
      blog.delete(id);
      Vue.delete(state.blogs, id);
    }
  }
})