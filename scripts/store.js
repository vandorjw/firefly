const store = new Vuex.Store({
    strict: true,
    state: {
      user: {
        displayName: null,
        email: null,
        emailVerified: null,
        photoURL: null,
        isAnonymous: null,
        uid: null,
        providerData: null
      }
    },
    getters: {
        email: state => state.user.email
    },
    mutations: {
      login (state, payload) {
        state.user.displayName = payload.displayName
        state.user.email = payload.email
        state.user.emailVerified = payload.displayName
        state.user.photoURL = payload.photoURL
        state.user.isAnonymous = false
        state.user.uid = payload.uid
        state.user.providerData = payload.providerData
      },
      logout(state) {
          state.user.displayName = null
          state.user.email = null
          state.user.emailVerified = null
          state.user.photoURL = null
          state.user.isAnonymous = true
          state.user.uid = null
          state.user.providerData = null
      }
    },
    actions: {
        login (context) {
            context.commit('login')
        },
        logout (context) {
            context.commit('logout')
        }
    }
  })