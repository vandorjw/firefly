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
    tosUrl: '/#/terms-of-service',
    privacyPolicyUrl: '/#/privacy-policy'
};


// Define a new component firebase-auth-ui
const AuthUI = Vue.component('firebase-auth-ui', {
    computed: {
        email: function () {
            return this.$store.getters.email
        }
    },
    methods: {
        signOut() {
            firebase.auth().signOut().then(function () {
                store.commit('logout');
            }).catch(function (error) {
                // An error happened.
            });
        },
        signIn() {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    store.commit('login', user);
                }
            });
        }
    },
    mounted: function () {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
          ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        ui.start('#firebaseui-auth-container', uiConfig);
    },
    updated: function () {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
          ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        ui.start('#firebaseui-auth-container', uiConfig);


    },
    template: `<div class="medium-12 cell align-center">
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
        <button v-on:click="signOut"> sign out </button>
    </div>`
})