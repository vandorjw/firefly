Vue.component('top-bar', {
    props: ['user'],
    methods: {
        signOut() {
            firebase.auth().signOut().then(function () {
              store.commit('logout');
            }).catch(function (error) {
              // An error happened.
            });
          }
    },
    template: `
    <div class="top-bar">
        <div class="top-bar-left">
            <ul class="menu">
                <li class="menu-text">Firefly</li>
            </ul>
        </div>
        <div class="top-bar-right">
            <ul class="menu">
                <li><router-link to="/profile">Profile</router-link></li>
                <li><router-link to="/foo">Foo</router-link></li>
                <li><router-link to="/blogs">Blogs</router-link></li>
                <li v-if="user"><router-link to="/auth"><span @click="signOut">Logout</span></router-link></li>
                <li v-else><router-link to="/auth">Login</router-link></li>
            </ul>
        </div>
    </div>`
})
