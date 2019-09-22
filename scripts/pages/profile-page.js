const Profile = Vue.component('Profile', {
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    template: `
    <div>
        <div v-if="user">
            <h2>What information has been collected about you?</h2>
            <p>Hi internet stranger! Welcome to the site. This site does not make use of cookies as far as I am aware. By signing up, I did collect the following information.</p>
            <ul>
                <li><strong>email</strong>: <span>{{user.email}}</span></li>
                <li><strong>displayName</strong>: <span>{{user.displayName}}</span></li>
                <li><strong>photoURL</strong>: <span>{{user.photoURL}}</span></li>
                <li><strong>phoneNumber</strong>: <span>{{user.phoneNumber}}</span></li>

            </ul>
            <p>In the future I plan to create a link here where you can terminate your account.</p>
        </div>
        <div v-else>
            <span>You must be signed in to view this page</span>
        </div>
    </div>`
  })