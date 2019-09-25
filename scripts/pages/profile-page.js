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
            <p>Hi internet stranger! Welcome to the site. By signing up, I collected the following information.</p>
            <ul>
                <li><strong>email</strong>: <span>{{user.email}}</span></li>
                <li><strong>displayName</strong>: <span>{{user.displayName}}</span></li>
                <li><strong>photoURL</strong>: <span>{{user.photoURL}}</span></li>
                <li><strong>phoneNumber</strong>: <span>{{user.phoneNumber}}</span></li>
            </ul>
            <p>If you have the Vue DevTools extension installed, check the VueX store user object.</p> 

            <p>There might also be a cookie from Google Analytics. It is not required for the site to function.</p>
            <p>In the future I plan to create a link here where you can terminate your account.</p>
        </div>
        <div v-else>
            <span>You must be signed in to view this page</span>
        </div>
    </div>`
  })