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
    },
    setUserCollection() {
      if (this.user) {

        let userDB = firebase.firestore().collection('users');
        let docRef = userDB.doc(this.user.uid);

        docRef.get().then(docSnapshot => {
          if (docSnapshot.exists) {
            // This userId exists in my firestore collection.
          } else {
            // This userId does not exist in my firestore collection.
            docRef.set({}) // I just want to set the record, without any data.
              .then(function () {
                console.log("Document successfully written!");
              })
              .catch(function (error) {
                console.error("Error writing document: ", error);
              });
          }
        })
      }
    },
    getTasks() {
      var self = this;
      let taskDB = firebase.firestore().collection('users').doc(this.user.uid).collection("tasks");
      taskDB.get().then(querySnapshot => {
        querySnapshot.forEach(function (doc) {
          self.$store.commit('setTask', doc);
        });
      })
    }
  },
  async created() {
    // when the app is created run the set user method
    // this uses Vuex to check if a user is signed in
    // check out mutations in the store.js file
    let user = await this.checkAuthStatus();
    this.$store.commit('login', user);
    this.setUserCollection();
    this.getTasks();
  }
})