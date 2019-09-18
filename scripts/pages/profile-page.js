const Profile = Vue.component('Profile', {
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    template: `
    <div>
        <div v-if="user">
            <span>{{user.email}}</span>
        </div>
        <div v-else>
            <span>You must be signed in to view this page</span>
        </div>
    </div>`
  })