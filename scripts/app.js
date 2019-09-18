var app = new Vue({
  el: '#app',
  router,
  store,
  data: {
    message: 'Hello Vue!'
  },
  computed: {
    user: function () {
      return this.$store.getters.user
    }
  },
  methods: {
    checkAuthStatus() {
      return new Promise((resolve, reject) => {
        try {
          firebase.auth()
            .onAuthStateChanged(user => {
              resolve(user);
            });
        } catch {
          reject('api failed')
        }
      });
    }
  },
  async created() {
    // when the app is created run the set user method
    // this uses Vuex to check if a user is signed in
    // check out mutations in the store.js file
    let user = await this.checkAuthStatus();
    this.$store.commit('login', user);
  }
})