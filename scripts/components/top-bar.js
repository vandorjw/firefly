Vue.component('top-bar', {
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    methods: {
        signOut() {
            firebase.auth().signOut().then(function () {
              store.commit('logout');
            }).catch(function (error) {
              // An error happened.
            });
          }
    },
    updated(){
        if(this.user){
            let topBarMenu = $('.top-bar');
            var elem = new Foundation.DropdownMenu(topBarMenu, {});
        } else {
            $('.top-bar').foundation('_destroy');
        }
      },
    template: `
    <div class="top-bar">
        <div class="top-bar-left">
            <ul class="dropdown  menu">
                <li><router-link to="/">Home</router-link></li>
            </ul>
        </div>
        <div class="top-bar-right">
            <ul class="dropdown menu" data-dropdown-menu>
                <li><router-link to="/profile">Profile</router-link></li>
                <li><router-link to="/tasks">Tasks</router-link></li>
                <li>
                    <router-link to="/blogs">Blogs</router-link>
                    <ul v-if="user" class="menu vertical">
                        <li><router-link to="/blogs/create">Create</router-link></li>
                    </ul>
                </li>
                <li v-if="user"><router-link to="/auth"><span @click="signOut">Logout</span></router-link></li>
                <li v-else><router-link to="/auth">Login</router-link></li>
            </ul>
        </div>
    </div>
    `
})
