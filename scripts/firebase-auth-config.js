var uiConfig = {

    autoUpgradeAnonymousUsers: true,

    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;

        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        },
        // signInFailure callback must be provided to handle merge conflicts which
        // occur when an existing credential is linked to an anonymous user.
        signInFailure: function (error) {
            // For merge conflicts, the error.code will be
            // 'firebaseui/anonymous-upgrade-merge-conflict'.
            if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
                return Promise.resolve();
            }
            // The credential the user tried to sign in with.
            var cred = error.credential;
            // Copy data from anonymous user to permanent user and delete anonymous
            // user.
            // ...
            // Finish sign-in after data is copied.
            return firebase.auth().signInWithCredential(cred);
        }

    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '#terms-of-service',
    // Privacy policy url.
    privacyPolicyUrl: '#privacy-policy'
};


// Define a new component firebase-auth-ui
Vue.component('firebase-auth-ui', {
    data: function () {
        return {
            // email: this.$store.getters.email,
            ui: null
        }
    },
    computed: {
        email: function () {
            return this.$store.getters.email
        }
    },
    methods: {
        signOut() {
            firebase.auth().signOut().then(function () {
                store.commit('logout');
                console.log("User sign out successfull");
            }).catch(function (error) {
                // An error happened.
            });
        }
    },
    created: function () {
        var self = this;

        if (self.ui) {
            self.ui.reset();
        } else {
            self.ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        self.ui.start('#firebaseui-auth-container', uiConfig);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                store.commit('login', user);
                console.log('User is signed in');
            } else {
                console.log("User is not signed in");
            }
        });
    },
    updated: function () {
        var self = this;
        if (self.ui) {
            self.ui.reset();
        } else {
            self.ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        self.ui.start('#firebaseui-auth-container', uiConfig);
    },
    template: `<div>
        <div v-if="email">
            <p> you are signed in: {{email}}</p>
            <button v-on:click="signOut"> sign out </button>
        </div>
        <div v-else>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
        </div>
    </div>`
})