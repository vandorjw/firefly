const Profile = Vue.component('Profile', {
    computed: {
        email: function () {
            return this.$store.getters.email
        }
    },
    template: `
    <div>
        <span v-if="email">{{email}}</span>
        <span v-else>You must be signed in to view this page</span>
    </div>`
  })